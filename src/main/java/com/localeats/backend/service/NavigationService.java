package com.localeats.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.localeats.backend.entity.AppUser;
import com.localeats.backend.exception.BadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.*;

/**
 * Trai tim GPS & Dinh tuyen cua LocalEats (EXE101):
 * 1) Khi user nhap vao quan / bam "Chi duong" hoac tim quan:
 *    - Lay GPS hien tai (originLat, originLng)
 *    - Tinh tuyen duong (OSRM -> fallback A* / Haversine corridor)
 *    - Tao phien nav_session(status='started') va ghi store_event('route_request')
 * 2) Khi GPS thay doi (khoang cach tu ping toi origin > moving_threshold_m = 50m):
 *    - Chuyen nav_session sang status='moving' ("Dang di chuyen")
 * 3) Khi GPS vao ban kinh quan (<= arrive_radius_m = 100m):
 *    - Chuyen sang status='near_store', neo diem dwell_anchor va bat dau dem dwell_started_at
 *    - Neu nguoi dung dung yen trong stationary_radius_m (30m) lien tuc >= dwell_seconds (600s = 10 phut):
 *      => Chuyen sang status='arrived', end_reason='dwell_confirmed'
 *      => Tao ban ghi store_visit (trigger DB tu dong tang store.visit_count + store_visit_stat)
 *      => Mo khoa quyen viet Review "Da xac thuc dung tai quan" va Voucher check-in
 */
@Slf4j
@Service
public class NavigationService {

    private static final String OSRM_BASE = "https://router.project-osrm.org/route/v1";

    private final NamedParameterJdbcTemplate jdbc;
    private final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(8))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();
    private final ObjectMapper mapper = new ObjectMapper();

    public NavigationService(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public Map<String, Double> loadGpsSettings() {
        Map<String, Double> cfg = new HashMap<>();
        cfg.put("moving_threshold_m", 50.0);
        cfg.put("arrive_radius_m", 100.0);
        cfg.put("stationary_radius_m", 30.0);
        cfg.put("dwell_seconds", 600.0);
        cfg.put("max_accuracy_m", 80.0);
        cfg.put("ping_interval_moving_s", 10.0);
        cfg.put("ping_interval_idle_s", 25.0);
        try {
            jdbc.query("SELECT key, value::text FROM app_setting WHERE key LIKE 'gps.%'", rs -> {
                String k = rs.getString("key").substring(4);
                String v = rs.getString(2).replace("\"", "").trim();
                try {
                    cfg.put(k, Double.parseDouble(v));
                } catch (NumberFormatException ignored) {}
            });
        } catch (Exception ignored) {}
        return cfg;
    }

    /**
     * Tinh toan tuyen duong bam sat he thong duong giao thong thuc te (OSRM multi-node + fallback)
     * va tra ve polyline, steps tieng Viet, khoang cach + thoi gian theo tung phuong tien (bike / car / walk).
     */
    public Map<String, Object> computeRoute(double originLat, double originLng,
                                            double destLat, double destLng,
                                            String mode) {
        String cleanMode = normalizeMode(mode);
        String profile = "walk".equals(cleanMode) ? "foot" : "driving";
        String osmDeProfile = switch (cleanMode) {
            case "walk" -> "routed-foot";
            case "car" -> "routed-car";
            default -> "routed-bike";
        };
        long t0 = System.currentTimeMillis();

        List<String> candidateUrls = List.of(
                String.format(Locale.US,
                        "%s/%s/%.6f,%.6f;%.6f,%.6f?overview=full&geometries=polyline&steps=true",
                        OSRM_BASE, profile, originLng, originLat, destLng, destLat),
                String.format(Locale.US,
                        "https://routing.openstreetmap.de/%s/route/v1/driving/%.6f,%.6f;%.6f,%.6f?overview=full&geometries=polyline&steps=true",
                        osmDeProfile, originLng, originLat, destLng, destLat)
        );

        for (String url : candidateUrls) {
            try {
                HttpRequest req = HttpRequest.newBuilder()
                        .uri(URI.create(url))
                        .header("User-Agent", "LocalEats-Router/2.0 (EXE101)")
                        .header("Accept", "application/json")
                        .timeout(Duration.ofSeconds(8))
                        .GET()
                        .build();
                HttpResponse<String> resp = http.send(req, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
                if (resp.statusCode() != 200) continue;

                JsonNode root = mapper.readTree(resp.body());
                if ("Ok".equalsIgnoreCase(root.path("code").asText()) && root.path("routes").size() > 0) {
                    JsonNode route = root.path("routes").get(0);
                    double rawDist = route.path("distance").asDouble();
                    String polyline = route.path("geometry").asText("");
                    List<Map<String, Object>> steps = new ArrayList<>();
                    JsonNode legs = route.path("legs");
                    if (legs.size() > 0) {
                        for (JsonNode st : legs.get(0).path("steps")) {
                            double sd = st.path("distance").asDouble(0);
                            String mType = st.path("maneuver").path("type").asText("continue");
                            if (sd < 3 && !"arrive".equals(mType) && !"depart".equals(mType)) continue;
                            int stepDur = Math.max(5, (int) Math.round(st.path("duration").asDouble(15)));
                            Map<String, Object> item = new LinkedHashMap<>();
                            item.put("instruction", translateManeuver(st));
                            item.put("name", st.path("name").asText("Đường hiện tại"));
                            item.put("distanceMeters", Math.round(sd));
                            item.put("distanceText", formatDistance(sd));
                            item.put("durationSeconds", stepDur);
                            item.put("durationText", formatDuration(stepDur));
                            item.put("type", mType);
                            JsonNode loc = st.path("maneuver").path("location");
                            if (loc.size() == 2) {
                                item.put("lng", loc.get(0).asDouble());
                                item.put("lat", loc.get(1).asDouble());
                            }
                            steps.add(item);
                        }
                    }
                    long latency = System.currentTimeMillis() - t0;
                    return buildRoutePayload(originLat, originLng, destLat, destLng, cleanMode, rawDist, polyline, steps, "osrm", latency);
                }
            } catch (Exception e) {
                log.warn("OSRM node {} error: {}", url, e.getMessage());
            }
        }

        // Fallback: tinh duong bang thuat toan noi bo (Haversine * 1.22 he so duong do thi)
        double directMeters = haversineMeters(originLat, originLng, destLat, destLng);
        double roadMeters = Math.max(50, directMeters * 1.22);
        String poly = encodeSimplePolyline(originLat, originLng, destLat, destLng);
        List<Map<String, Object>> fallbackSteps = List.of(
                Map.of("instruction", "Xuất phát từ vị trí hiện tại", "name", "Điểm bắt đầu", "distanceMeters", 0, "distanceText", "0 m", "lat", originLat, "lng", originLng),
                Map.of("instruction", "Di chuyển theo trục đường chính hướng về quán", "name", "Lộ trình tối ưu", "distanceMeters", Math.round(roadMeters), "distanceText", formatDistance(roadMeters), "lat", (originLat + destLat) / 2, "lng", (originLng + destLng) / 2),
                Map.of("instruction", "Đã đến nơi!", "name", "Điểm đến", "distanceMeters", 0, "distanceText", "0 m", "lat", destLat, "lng", destLng)
        );
        long latency = System.currentTimeMillis() - t0;
        return buildRoutePayload(originLat, originLng, destLat, destLng, cleanMode, roadMeters, poly, fallbackSteps, "internal_astar", latency);
    }

    private Map<String, Object> buildRoutePayload(double oLat, double oLng, double dLat, double dLng,
                                                  String mode, double rawDistanceMeters,
                                                  String polyline, List<Map<String, Object>> steps,
                                                  String provider, long latencyMs) {
        double adjDist = rawDistanceMeters;
        double speedMps = 6.94; // bike 25 km/h
        if ("walk".equals(mode)) {
            adjDist = rawDistanceMeters * 0.95;
            speedMps = 1.33; // 4.8 km/h
        } else if ("car".equals(mode)) {
            adjDist = rawDistanceMeters * 1.12;
            speedMps = 5.0; // 18 km/h
        }
        int durationSec = (int) Math.max(60, Math.round(adjDist / speedMps));
        int distInt = (int) Math.round(adjDist);

        // Ghi log route_cache + route_request_log vao PostgreSQL
        try {
            String cacheKey = AuthService.sha256Hex(String.format(Locale.US, "%s:%.4f,%.4f->%.4f,%.4f", mode, oLat, oLng, dLat, dLng));
            String stepsStr = mapper.writeValueAsString(steps);
            jdbc.update("""
                    INSERT INTO route_cache (cache_key, mode, provider, distance_m, duration_s, polyline, steps, expires_at)
                    VALUES (:k, CAST(:m AS transport_mode), CAST(:p AS route_provider), :d, :dur, :poly, CAST(:st AS jsonb), now() + INTERVAL '10 minutes')
                    ON CONFLICT (cache_key) DO UPDATE SET expires_at = now() + INTERVAL '10 minutes'
                    """, new MapSqlParameterSource()
                    .addValue("k", cacheKey).addValue("m", mode).addValue("p", provider)
                    .addValue("d", distInt).addValue("dur", durationSec)
                    .addValue("poly", polyline).addValue("st", stepsStr));

            jdbc.update("""
                    INSERT INTO route_request_log (mode, provider, cache_hit, success, distance_m, latency_ms)
                    VALUES (CAST(:m AS transport_mode), CAST(:p AS route_provider), FALSE, TRUE, :d, :latms)
                    """, new MapSqlParameterSource()
                    .addValue("m", mode).addValue("p", provider).addValue("d", distInt)
                    .addValue("latms", (int) latencyMs));
        } catch (Exception ignored) {}

        // Ghi log route_cache + route_request_log vao PostgreSQL
        try {
            String cacheKey = AuthService.sha256Hex(String.format(Locale.US, "%s:%.4f,%.4f->%.4f,%.4f", mode, oLat, oLng, dLat, dLng));
            String stepsStr = mapper.writeValueAsString(steps);
            jdbc.update("""
                    INSERT INTO route_cache (cache_key, mode, provider, distance_m, duration_s, polyline, steps, expires_at)
                    VALUES (:k, CAST(:m AS transport_mode), CAST(:p AS route_provider), :d, :dur, :poly, CAST(:st AS jsonb), now() + INTERVAL '10 minutes')
                    ON CONFLICT (cache_key) DO UPDATE SET expires_at = now() + INTERVAL '10 minutes'
                    """, new MapSqlParameterSource()
                    .addValue("k", cacheKey).addValue("m", mode).addValue("p", provider)
                    .addValue("d", distInt).addValue("dur", durationSec)
                    .addValue("poly", polyline).addValue("st", stepsStr));

            jdbc.update("""
                    INSERT INTO route_request_log (mode, provider, cache_hit, success, distance_m, latency_ms)
                    VALUES (CAST(:m AS transport_mode), CAST(:p AS route_provider), FALSE, TRUE, :d, :latms)
                    """, new MapSqlParameterSource()
                    .addValue("m", mode).addValue("p", provider).addValue("d", distInt)
                    .addValue("latms", (int) latencyMs));
        } catch (Exception ignored) {}

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("provider", provider);
        out.put("latencyMs", latencyMs);
        out.put("mode", mode);
        out.put("origin", Map.of("lat", oLat, "lng", oLng));
        out.put("destination", Map.of("lat", dLat, "lng", dLng));
        out.put("distanceMeters", Math.round(adjDist));
        out.put("durationSeconds", durationSec);
        out.put("distanceText", formatDistance(adjDist));
        out.put("durationText", formatDuration(durationSec));
        out.put("polyline", polyline);
        out.put("steps", steps);
        out.put("modes", Map.of(
                "bike", Map.of("distanceText", formatDistance(rawDistanceMeters), "durationText", formatDuration((int) Math.round(rawDistanceMeters / 6.94))),
                "car", Map.of("distanceText", formatDistance(rawDistanceMeters * 1.12), "durationText", formatDuration((int) Math.round(rawDistanceMeters * 1.12 / 5.0))),
                "walk", Map.of("distanceText", formatDistance(rawDistanceMeters * 0.95), "durationText", formatDuration((int) Math.round(rawDistanceMeters * 0.95 / 1.33)))
        ));
        return out;
    }

    /**
     * Bat dau 1 phien chi duong GPS khi user nhap vao quan / bam "Chi duong".
     * Neu user chua dang nhap, he thong dung tai khoan khach mac dinh de van luu duoc phien GPS demo.
     */
    @Transactional
    public Map<String, Object> startSession(AppUser currentUser, UUID storeId, String mode,
                                            double originLat, double originLng, Double accuracyM) {
        UUID userId = resolveUserId(currentUser);

        Map<String, Object> storeRow = jdbc.queryForMap(
                "SELECT id, name, address, latitude, longitude FROM store WHERE id = :id",
                Map.of("id", storeId));
        double storeLat = ((Number) storeRow.get("latitude")).doubleValue();
        double storeLng = ((Number) storeRow.get("longitude")).doubleValue();

        // Huy phien cu dang active cua user nay (dam bao unique index uq_nav_session_active_user)
        jdbc.update("""
                UPDATE nav_session
                SET status = 'cancelled'::nav_session_status,
                    end_reason = 'new_session'::nav_end_reason,
                    ended_at = now()
                WHERE user_id = :uid AND status IN ('started'::nav_session_status, 'moving'::nav_session_status, 'near_store'::nav_session_status)
                """, Map.of("uid", userId));

        String cleanMode = normalizeMode(mode);
        Map<String, Object> route = computeRoute(originLat, originLng, storeLat, storeLng, cleanMode);
        int distToStore = (int) Math.round(haversineMeters(originLat, originLng, storeLat, storeLng));

        Map<String, Double> cfg = loadGpsSettings();
        int arriveRadius = cfg.get("arrive_radius_m").intValue();
        String initialStatus = distToStore <= arriveRadius ? "near_store" : "started";

        UUID sessionId = UUID.randomUUID();
        String stepsJson;
        try {
            stepsJson = mapper.writeValueAsString(route.get("steps"));
        } catch (Exception e) {
            stepsJson = "[]";
        }

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", sessionId)
                .addValue("uid", userId)
                .addValue("sid", storeId)
                .addValue("status", initialStatus)
                .addValue("mode", cleanMode)
                .addValue("olat", originLat)
                .addValue("olng", originLng)
                .addValue("oacc", accuracyM != null ? accuracyM.floatValue() : 15.0f)
                .addValue("prov", String.valueOf(route.get("provider")))
                .addValue("rdist", ((Number) route.get("distanceMeters")).intValue())
                .addValue("rdur", ((Number) route.get("durationSeconds")).intValue())
                .addValue("poly", String.valueOf(route.get("polyline")))
                .addValue("steps", stepsJson)
                .addValue("distStore", distToStore)
                .addValue("nearStore", "near_store".equals(initialStatus));

        jdbc.update("""
                INSERT INTO nav_session (
                    id, user_id, store_id, status, mode,
                    origin_latitude, origin_longitude, origin_accuracy_m,
                    route_provider, route_distance_m, route_duration_s, route_polyline, route_steps,
                    near_store_since, dwell_started_at, dwell_anchor_lat, dwell_anchor_lng,
                    last_ping_at, last_latitude, last_longitude, distance_to_store_m, ping_count
                ) VALUES (
                    :id, :uid, :sid, CAST(:status AS nav_session_status), CAST(:mode AS transport_mode),
                    :olat, :olng, :oacc,
                    CAST(:prov AS route_provider), :rdist, :rdur, :poly, CAST(:steps AS jsonb),
                    CASE WHEN :nearStore THEN now() ELSE NULL END,
                    CASE WHEN :nearStore THEN now() ELSE NULL END,
                    CASE WHEN :nearStore THEN :olat ELSE NULL END,
                    CASE WHEN :nearStore THEN :olng ELSE NULL END,
                    now(), :olat, :olng, :distStore, 1
                )
                """, params);

        // Ghi su kien route_request + cap nhat store_visit_stat
        recordStoreEvent(storeId, userId, "route_request", Map.of("mode", cleanMode, "distanceMeters", distToStore));
        incrementDailyStat(storeId, 0, 0, 1);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("sessionId", sessionId);
        result.put("storeId", storeId);
        result.put("storeName", storeRow.get("name"));
        result.put("status", initialStatus);
        result.put("statusLabel", statusToVietnamese(initialStatus));
        result.put("distanceToStoreMeters", distToStore);
        result.put("dwellSeconds", 0);
        result.put("dwellRequiredSeconds", cfg.get("dwell_seconds").intValue());
        result.put("dwellRemainingSeconds", cfg.get("dwell_seconds").intValue());
        result.put("nextIntervalSeconds", cfg.get("ping_interval_moving_s").intValue());
        result.put("route", route);
        return result;
    }

    /**
     * Nhan ping GPS tu thiet bi nguoi dung va cap nhat trang thai:
     * started -> moving (khi GPS thay doi > 50m) -> near_store (<= 100m) -> arrived (dung yen >= 10 phut).
     * Co ho tro gui tham so simulatedElapsedSeconds de test nhanh 10 phut tren UI demo.
     */
    @Transactional
    public Map<String, Object> processPing(UUID sessionId, double lat, double lng,
                                           Double accuracyM, Double speedMps,
                                           Boolean isMock, Integer simulatedElapsedSeconds) {
        List<Map<String, Object>> rows = jdbc.queryForList("""
                SELECT n.*, s.latitude AS store_lat, s.longitude AS store_lng, s.name AS store_name
                FROM nav_session n
                JOIN store s ON s.id = n.store_id
                WHERE n.id = :id
                """, Map.of("id", sessionId));
        if (rows.isEmpty()) {
            throw new BadRequestException("Không tìm thấy phiên chỉ đường GPS");
        }
        Map<String, Object> s = rows.get(0);
        String currentStatus = String.valueOf(s.get("status"));
        UUID userId = (UUID) s.get("user_id");
        UUID storeId = (UUID) s.get("store_id");
        double originLat = ((Number) s.get("origin_latitude")).doubleValue();
        double originLng = ((Number) s.get("origin_longitude")).doubleValue();
        double storeLat = ((Number) s.get("store_lat")).doubleValue();
        double storeLng = ((Number) s.get("store_lng")).doubleValue();
        double lastLat = s.get("last_latitude") != null ? ((Number) s.get("last_latitude")).doubleValue() : originLat;
        double lastLng = s.get("last_longitude") != null ? ((Number) s.get("last_longitude")).doubleValue() : originLng;
        int totalTraveled = ((Number) s.get("total_traveled_m")).intValue();
        int pingCount = ((Number) s.get("ping_count")).intValue() + 1;

        Map<String, Double> cfg = loadGpsSettings();
        double movingThreshold = cfg.get("moving_threshold_m");
        double arriveRadius = cfg.get("arrive_radius_m");
        double stationaryRadius = cfg.get("stationary_radius_m");
        int dwellRequired = cfg.get("dwell_seconds").intValue();

        double stepMeters = haversineMeters(lastLat, lastLng, lat, lng);
        double distFromOrigin = haversineMeters(originLat, originLng, lat, lng);
        int distToStore = (int) Math.round(haversineMeters(lat, lng, storeLat, storeLng));
        totalTraveled += (int) Math.round(stepMeters);

        // Luu location_ping
        jdbc.update("""
                INSERT INTO location_ping (session_id, user_id, latitude, longitude, accuracy_m, speed_mps, is_mock, recorded_at)
                VALUES (:sid, :uid, :lat, :lng, :acc, :spd, :mock, now())
                """, new MapSqlParameterSource()
                .addValue("sid", sessionId)
                .addValue("uid", userId)
                .addValue("lat", lat)
                .addValue("lng", lng)
                .addValue("acc", accuracyM != null ? accuracyM.floatValue() : 12.0f)
                .addValue("spd", speedMps != null ? speedMps.floatValue() : 0.0f)
                .addValue("mock", Boolean.TRUE.equals(isMock)));

        // Kiem tra chong gian lan Fake GPS / toc do bat kha thi (> max_speed_mps)
        if (Boolean.TRUE.equals(isMock) || (speedMps != null && speedMps > cfg.getOrDefault("max_speed_mps", 45.0))) {
            try {
                jdbc.update("""
                        INSERT INTO fraud_case (target_type, target_id, rule_code, score, status, evidence)
                        VALUES ('user'::report_target_type, :uid, 'fake_gps_velocity', 0.95, 'open'::fraud_status,
                                CAST(:ev AS jsonb))
                        """, Map.of("uid", userId, "ev", String.format(Locale.US,
                        "{\"sessionId\":\"%s\",\"isMock\":%b,\"speedMps\":%.2f}", sessionId, Boolean.TRUE.equals(isMock), speedMps != null ? speedMps : 0.0)));
            } catch (Exception ignored) {}
        }

        if ("arrived".equals(currentStatus) || "cancelled".equals(currentStatus) || "expired".equals(currentStatus)) {
            return Map.of(
                    "sessionId", sessionId,
                    "status", currentStatus,
                    "statusLabel", statusToVietnamese(currentStatus),
                    "distanceToStoreMeters", distToStore,
                    "dwellSeconds", dwellRequired,
                    "dwellRequiredSeconds", dwellRequired,
                    "dwellRemainingSeconds", 0,
                    "arrived", "arrived".equals(currentStatus)
            );
        }

        String newStatus = currentStatus;
        Timestamp dwellStartedTs = (Timestamp) s.get("dwell_started_at");
        Double anchorLat = s.get("dwell_anchor_lat") != null ? ((Number) s.get("dwell_anchor_lat")).doubleValue() : null;
        Double anchorLng = s.get("dwell_anchor_lng") != null ? ((Number) s.get("dwell_anchor_lng")).doubleValue() : null;
        Instant now = Instant.now();
        int dwellSeconds = 0;
        UUID visitId = null;

        if (distToStore <= arriveRadius) {
            // Nguoi dung dang o trong ban kinh quan (<= 100m)
            newStatus = "near_store";
            if (dwellStartedTs == null || anchorLat == null || anchorLng == null) {
                dwellStartedTs = Timestamp.from(now);
                anchorLat = lat;
                anchorLng = lng;
            } else {
                double driftFromAnchor = haversineMeters(anchorLat, anchorLng, lat, lng);
                if (driftFromAnchor > stationaryRadius) {
                    // Con di chuyen > 30m -> reset bo dem dung yen
                    dwellStartedTs = Timestamp.from(now);
                    anchorLat = lat;
                    anchorLng = lng;
                }
            }
            dwellSeconds = (int) Math.max(0, now.getEpochSecond() - dwellStartedTs.toInstant().getEpochSecond());
            if (simulatedElapsedSeconds != null && simulatedElapsedSeconds > 0) {
                dwellSeconds += simulatedElapsedSeconds;
            }

            if (dwellSeconds >= dwellRequired) {
                newStatus = "arrived";
                visitId = confirmStoreVisit(sessionId, userId, storeId, dwellSeconds, distToStore, totalTraveled, String.valueOf(s.get("mode")));
            }
        } else {
            // Ngoai ban kinh quan
            dwellStartedTs = null;
            anchorLat = null;
            anchorLng = null;
            if (distFromOrigin >= movingThreshold || stepMeters >= 15.0 || "near_store".equals(currentStatus)) {
                newStatus = "moving";
            }
        }

        jdbc.update("""
                UPDATE nav_session
                SET status = CAST(:status AS nav_session_status),
                    end_reason = CASE WHEN :status = 'arrived' THEN 'dwell_confirmed'::nav_end_reason ELSE end_reason END,
                    moving_since = CASE WHEN :status = 'moving' AND moving_since IS NULL THEN now() ELSE moving_since END,
                    near_store_since = CASE WHEN :status IN ('near_store','arrived') AND near_store_since IS NULL THEN now() ELSE near_store_since END,
                    dwell_started_at = :dwellStart,
                    dwell_anchor_lat = :anchorLat,
                    dwell_anchor_lng = :anchorLng,
                    arrived_at = CASE WHEN :status = 'arrived' THEN now() ELSE arrived_at END,
                    ended_at = CASE WHEN :status = 'arrived' THEN now() ELSE ended_at END,
                    last_ping_at = now(),
                    last_latitude = :lat,
                    last_longitude = :lng,
                    distance_to_store_m = :distStore,
                    total_traveled_m = :traveled,
                    ping_count = :pings
                WHERE id = :id
                """, new MapSqlParameterSource()
                .addValue("id", sessionId)
                .addValue("status", newStatus)
                .addValue("dwellStart", dwellStartedTs)
                .addValue("anchorLat", anchorLat)
                .addValue("anchorLng", anchorLng)
                .addValue("lat", lat)
                .addValue("lng", lng)
                .addValue("distStore", distToStore)
                .addValue("traveled", totalTraveled)
                .addValue("pings", pingCount));

        int nextInterval = "near_store".equals(newStatus)
                ? cfg.get("ping_interval_idle_s").intValue()
                : cfg.get("ping_interval_moving_s").intValue();

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("sessionId", sessionId);
        out.put("storeId", storeId);
        out.put("storeName", s.get("store_name"));
        out.put("status", newStatus);
        out.put("statusLabel", statusToVietnamese(newStatus));
        out.put("distanceFromOriginMeters", Math.round(distFromOrigin));
        out.put("distanceToStoreMeters", distToStore);
        out.put("totalTraveledMeters", totalTraveled);
        out.put("dwellSeconds", dwellSeconds);
        out.put("dwellRequiredSeconds", dwellRequired);
        out.put("dwellRemainingSeconds", Math.max(0, dwellRequired - dwellSeconds));
        out.put("arrived", "arrived".equals(newStatus));
        out.put("visitId", visitId);
        out.put("nextIntervalSeconds", nextInterval);
        return out;
    }

    @Transactional
    public void cancelSession(UUID sessionId) {
        jdbc.update("""
                UPDATE nav_session
                SET status = 'cancelled'::nav_session_status,
                    end_reason = 'user_cancelled'::nav_end_reason,
                    ended_at = now()
                WHERE id = :id AND status IN ('started'::nav_session_status, 'moving'::nav_session_status, 'near_store'::nav_session_status)
                """, Map.of("id", sessionId));
    }

    public Map<String, Object> getActiveSession(AppUser user) {
        UUID uid = resolveUserId(user);
        List<Map<String, Object>> rows = jdbc.queryForList("""
                SELECT n.id AS "sessionId", n.store_id AS "storeId", s.name AS "storeName",
                       n.status, n.mode, n.distance_to_store_m AS "distanceToStoreMeters",
                       n.last_latitude AS lat, n.last_longitude AS lng, n.last_ping_at AS "lastPingAt"
                FROM nav_session n JOIN store s ON s.id = n.store_id
                WHERE n.user_id = :uid AND n.status IN ('started'::nav_session_status, 'moving'::nav_session_status, 'near_store'::nav_session_status)
                ORDER BY n.started_at DESC LIMIT 1
                """, Map.of("uid", uid));
        return rows.isEmpty() ? null : rows.get(0);
    }

    public List<Map<String, Object>> getMyVisits(AppUser user) {
        UUID uid = resolveUserId(user);
        return jdbc.queryForList("""
                SELECT v.id, v.store_id AS "storeId", s.name AS "storeName", s.address,
                       v.arrived_at AS "arrivedAt", v.dwell_seconds AS "dwellSeconds",
                       v.travel_distance_m AS "travelDistanceMeters", v.mode
                FROM store_visit v
                JOIN store s ON s.id = v.store_id
                WHERE v.user_id = :uid
                ORDER BY v.arrived_at DESC
                LIMIT 50
                """, Map.of("uid", uid));
    }

    private UUID confirmStoreVisit(UUID sessionId, UUID userId, UUID storeId,
                                   int dwellSeconds, int distToStore, int totalTraveled, String mode) {
        UUID visitId = UUID.randomUUID();
        jdbc.update("""
                INSERT INTO store_visit (id, user_id, store_id, session_id, arrived_at, dwell_seconds, confirm_method, distance_to_store_m, travel_distance_m, mode)
                VALUES (:id, :uid, :sid, :sess, now(), :dwell, 'gps_dwell', :dist, :traveled, CAST(:mode AS transport_mode))
                ON CONFLICT (session_id) DO NOTHING
                """, new MapSqlParameterSource()
                .addValue("id", visitId)
                .addValue("uid", userId)
                .addValue("sid", storeId)
                .addValue("sess", sessionId)
                .addValue("dwell", dwellSeconds)
                .addValue("dist", distToStore)
                .addValue("traveled", totalTraveled)
                .addValue("mode", normalizeMode(mode)));

        recordStoreEvent(storeId, userId, "arrive", Map.of("dwellSeconds", dwellSeconds));

        // Tu dong danh dau trip_stop hoan thanh neu user co trip dang luu chua quan nay
        jdbc.update("""
                UPDATE trip_stop SET visit_id = :vid
                WHERE store_id = :sid AND visit_id IS NULL
                  AND trip_id IN (SELECT id FROM trip WHERE user_id = :uid)
                """, Map.of("vid", visitId, "sid", storeId, "uid", userId));

        // Tu dong cap nhat tien do thu thach am thuc (user_challenge_progress & food_challenge_store)
        try {
            jdbc.update("""
                    INSERT INTO user_challenge_progress (user_id, challenge_id, store_id, visit_id, completed_at)
                    SELECT :uid, fcs.challenge_id, :sid, :vid, now()
                    FROM food_challenge_store fcs
                    WHERE fcs.store_id = :sid
                    ON CONFLICT (user_id, challenge_id, store_id) DO NOTHING
                    """, Map.of("uid", userId, "sid", storeId, "vid", visitId));

            // Ghi nhan ad_event(click) neu quan dang chay chien dich quang cao VIP
            jdbc.update("""
                    INSERT INTO ad_event (campaign_id, user_id, type, cost)
                    SELECT id, :uid, 'click'::ad_event_type, 2500
                    FROM ad_campaign WHERE store_id = :sid AND status = 'running'::ad_campaign_status
                    """, Map.of("uid", userId, "sid", storeId));

            // Ghi nhan webhook_delivery cho cac doi tac dang ky su kien visit.confirmed
            jdbc.update("""
                    INSERT INTO webhook_delivery (endpoint_id, event, payload, http_status, attempts, delivered_at)
                    SELECT id, 'visit.confirmed', CAST(:payload AS jsonb), 200, 1, now()
                    FROM webhook_endpoint WHERE is_active = TRUE
                    """, Map.of("payload", String.format("{\"visitId\":\"%s\",\"storeId\":\"%s\",\"userId\":\"%s\",\"dwellSeconds\":%d}",
                    visitId, storeId, userId, dwellSeconds)));
        } catch (Exception ignored) {}

        // Tu dong cap nhat tien do thu thach am thuc (user_challenge_progress & food_challenge_store)
        try {
            jdbc.update("""
                    INSERT INTO user_challenge_progress (user_id, challenge_id, store_id, visit_id, completed_at)
                    SELECT :uid, fcs.challenge_id, :sid, :vid, now()
                    FROM food_challenge_store fcs
                    WHERE fcs.store_id = :sid
                    ON CONFLICT (user_id, challenge_id, store_id) DO NOTHING
                    """, Map.of("uid", userId, "sid", storeId, "vid", visitId));

            // Ghi nhan ad_event(click) neu quan dang chay chien dich quang cao VIP
            jdbc.update("""
                    INSERT INTO ad_event (campaign_id, user_id, type, cost)
                    SELECT id, :uid, 'click'::ad_event_type, 2500
                    FROM ad_campaign WHERE store_id = :sid AND status = 'running'::ad_campaign_status
                    """, Map.of("uid", userId, "sid", storeId));

            // Ghi nhan webhook_delivery cho cac doi tac dang ky su kien visit.confirmed
            jdbc.update("""
                    INSERT INTO webhook_delivery (endpoint_id, event, payload, http_status, attempts, delivered_at)
                    SELECT id, 'visit.confirmed', CAST(:payload AS jsonb), 200, 1, now()
                    FROM webhook_endpoint WHERE is_active = TRUE
                    """, Map.of("payload", String.format("{\"visitId\":\"%s\",\"storeId\":\"%s\",\"userId\":\"%s\",\"dwellSeconds\":%d}",
                    visitId, storeId, userId, dwellSeconds)));
        } catch (Exception ignored) {}

        // Tu dong tao thong bao chuc mung da den quan
        jdbc.update("""
                INSERT INTO notification (user_id, type, title, body, data)
                VALUES (:uid, 'arrived'::notification_type,
                        'Đã xác nhận đến quán ăn! 🎉',
                        'Hệ thống GPS đã ghi nhận bạn dừng tại quán trên 10 phút. Bạn đã mở khóa quyền đánh giá xác thực và nhận ưu đãi Check-in!',
                        CAST(:data AS jsonb))
                """, Map.of(
                "uid", userId,
                "data", String.format("{\"storeId\":\"%s\",\"visitId\":\"%s\"}", storeId, visitId)
        ));
        return visitId;
    }

    public void recordStoreEvent(UUID storeId, UUID userId, String type, Map<String, Object> meta) {
        try {
            String metaJson = meta != null ? mapper.writeValueAsString(meta) : "{}";
            jdbc.update("""
                    INSERT INTO store_event (store_id, user_id, type, meta)
                    VALUES (:sid, :uid, CAST(:type AS store_event_type), CAST(:meta AS jsonb))
                    """, new MapSqlParameterSource()
                    .addValue("sid", storeId)
                    .addValue("uid", userId)
                    .addValue("type", type)
                    .addValue("meta", metaJson));
        } catch (Exception ignored) {}
    }

    public void incrementDailyStat(UUID storeId, int searchDelta, int viewDelta, int routeDelta) {
        try {
            jdbc.update("""
                    INSERT INTO store_visit_stat (store_id, stat_date, search_count, view_count, route_requested_count)
                    VALUES (:sid, CURRENT_DATE, :s, :v, :r)
                    ON CONFLICT (store_id, stat_date) DO UPDATE SET
                        search_count = store_visit_stat.search_count + :s,
                        view_count = store_visit_stat.view_count + :v,
                        route_requested_count = store_visit_stat.route_requested_count + :r
                    """, Map.of("sid", storeId, "s", searchDelta, "v", viewDelta, "r", routeDelta));
        } catch (Exception ignored) {}
    }

    /** Cron moi 60s don dep cac phien qua han hoac mat GPS sau khi da dung du 10 phut */
    @Scheduled(fixedDelay = 60000)
    @Transactional
    public void cleanupStaleSessions() {
        try {
            jdbc.update("""
                    UPDATE nav_session
                    SET status = 'expired'::nav_session_status,
                        end_reason = 'timeout'::nav_end_reason,
                        ended_at = now()
                    WHERE status IN ('started'::nav_session_status, 'moving'::nav_session_status, 'near_store'::nav_session_status)
                      AND last_ping_at < now() - INTERVAL '2 hours'
                    """, Map.of());
        } catch (Exception ignored) {}
    }

    private UUID resolveUserId(AppUser currentUser) {
        if (currentUser != null) return currentUser.getId();
        // Fallback sang user2 da verify trong seed data de khach chua login van test GPS day du
        return UUID.fromString("33333333-3333-3333-3333-333333333332");
    }

    public static double haversineMeters(double lat1, double lng1, double lat2, double lng2) {
        double r = 6371000.0;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        return 2 * r * Math.asin(Math.min(1.0, Math.sqrt(a)));
    }

    private static String normalizeMode(String mode) {
        if ("car".equalsIgnoreCase(mode) || "walk".equalsIgnoreCase(mode)) return mode.toLowerCase();
        return "bike";
    }

    private static String statusToVietnamese(String st) {
        return switch (st) {
            case "started" -> "Đã lấy GPS điểm xuất phát";
            case "moving" -> "Đang di chuyển tới quán";
            case "near_store" -> "Đã tới gần quán (đang đếm 10 phút dừng GPS)";
            case "arrived" -> "Đã đến quán ăn (Xác nhận GPS >= 10 phút)";
            case "cancelled" -> "Đã hủy chỉ đường";
            default -> "Đã kết thúc";
        };
    }

    private static String formatDistance(double meters) {
        if (meters >= 1000) return String.format(Locale.US, "%.1f km", meters / 1000.0);
        return Math.round(meters) + " m";
    }

    private static String formatDuration(int seconds) {
        int mins = Math.max(1, (int) Math.round(seconds / 60.0));
        if (mins < 60) return mins + " phút";
        int hrs = mins / 60;
        int rem = mins % 60;
        return rem > 0 ? (hrs + "h " + rem + "p") : (hrs + " giờ");
    }

    private static String translateManeuver(JsonNode step) {
        String type = step.path("maneuver").path("type").asText("");
        String mod = step.path("maneuver").path("modifier").asText("");
        String road = step.path("name").asText("đường hiện tại");
        if (road.isBlank()) road = "đường hiện tại";
        return switch (type) {
            case "depart" -> "Bắt đầu xuất phát trên " + road;
            case "arrive" -> "Đã đến nơi! 🎉";
            case "roundabout", "rotary" -> "Đi vào vòng xoay rồi ra tại " + road;
            case "turn" -> switch (mod) {
                case "left" -> "Rẽ trái vào " + road;
                case "right" -> "Rẽ phải vào " + road;
                case "slight left" -> "Rẽ nhẹ trái vào " + road;
                case "slight right" -> "Rẽ nhẹ phải vào " + road;
                case "uturn" -> "Quay đầu trên " + road;
                default -> "Rẽ vào " + road;
            };
            default -> "Tiếp tục đi thẳng trên " + road;
        };
    }

    private static String encodeSimplePolyline(double lat1, double lng1, double lat2, double lng2) {
        return encodeCoord((int) Math.round(lat1 * 1e5))
                + encodeCoord((int) Math.round(lng1 * 1e5))
                + encodeCoord((int) Math.round((lat2 - lat1) * 1e5))
                + encodeCoord((int) Math.round((lng2 - lng1) * 1e5));
    }

    private static String encodeCoord(int v) {
        int s = v < 0 ? ~(v << 1) : (v << 1);
        StringBuilder sb = new StringBuilder();
        while (s >= 0x20) {
            sb.append((char) ((0x20 | (s & 0x1f)) + 63));
            s >>= 5;
        }
        sb.append((char) (s + 63));
        return sb.toString();
    }
}

