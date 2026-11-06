package com.localeats.backend.service;

import com.localeats.backend.entity.AppUser;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class TripService {

    private final NamedParameterJdbcTemplate jdbc;

    public TripService(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> listTrips(AppUser user) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333333");
        List<Map<String, Object>> trips = jdbc.queryForList("""
                SELECT id, title, start_label AS "startLabel", dest_label AS "destLabel",
                       vehicle, status, total_distance_m AS "totalDistanceMeters",
                       total_duration_s AS "totalDurationSeconds",
                       budget_min AS "budgetMin", budget_max AS "budgetMax", created_at AS "createdAt"
                FROM trip WHERE user_id = :u OR is_public = TRUE
                ORDER BY created_at DESC LIMIT 20
                """, Map.of("u", uid));
        for (Map<String, Object> t : trips) {
            UUID tid = (UUID) t.get("id");
            List<Map<String, Object>> stops = jdbc.queryForList("""
                    SELECT ts.id, ts.store_id AS "storeId", ts.stop_order AS "stopOrder",
                           COALESCE(s.name, ts.label) AS name, s.address,
                           ts.latitude AS lat, ts.longitude AS lng,
                           ts.visit_id IS NOT NULL AS "visited"
                    FROM trip_stop ts LEFT JOIN store s ON s.id = ts.store_id
                    WHERE ts.trip_id = :tid ORDER BY ts.stop_order ASC
                    """, Map.of("tid", tid));
            t.put("stops", stops);
        }
        return trips;
    }

    @Transactional
    @SuppressWarnings("unchecked")
    public Map<String, Object> saveTrip(AppUser user, Map<String, Object> body) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333333");
        UUID tripId = UUID.randomUUID();
        String title = String.valueOf(body.getOrDefault("title", "Hành trình Food Tour Sài Gòn"));
        String startLabel = String.valueOf(body.getOrDefault("startPoint", "Điểm xuất phát"));
        String destLabel = String.valueOf(body.getOrDefault("destinationPoint", "Điểm kết thúc"));
        String vehicle = String.valueOf(body.getOrDefault("vehicle", "bike"));
        if (!List.of("bike", "car", "walk").contains(vehicle)) vehicle = "bike";

        List<Map<String, Object>> stops = (List<Map<String, Object>>) body.getOrDefault("stops", List.of());

        jdbc.update("""
                INSERT INTO trip (id, user_id, title, start_label, dest_label, vehicle, status, is_public)
                VALUES (:id, :u, :t, :s, :d, CAST(:v AS transport_mode), 'saved'::trip_status, TRUE)
                """, Map.of("id", tripId, "u", uid, "t", title, "s", startLabel, "d", destLabel, "v", vehicle));

        int order = 1;
        for (Map<String, Object> st : stops) {
            UUID sid = null;
            try {
                if (st.get("id") != null) sid = UUID.fromString(String.valueOf(st.get("id")));
            } catch (Exception ignored) {}
            double lat = st.get("lat") != null ? ((Number) st.get("lat")).doubleValue() : 10.7769;
            double lng = st.get("lng") != null ? ((Number) st.get("lng")).doubleValue() : 106.7009;
            String label = String.valueOf(st.getOrDefault("name", "Điểm dừng " + order));
            jdbc.update("""
                    INSERT INTO trip_stop (id, trip_id, store_id, stop_order, label, latitude, longitude)
                    VALUES (:id, :tid, :sid, :ord, :lbl, :lat, :lng)
                    """, new MapSqlParameterSource()
                    .addValue("id", UUID.randomUUID())
                    .addValue("tid", tripId)
                    .addValue("sid", sid)
                    .addValue("ord", order++)
                    .addValue("lbl", label)
                    .addValue("lat", lat)
                    .addValue("lng", lng));
        }

        return Map.of("tripId", tripId);
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> optimizeTrip(Map<String, Object> body) {
        double startLat = body.get("startLat") != null ? ((Number) body.get("startLat")).doubleValue() : 10.7769;
        double startLng = body.get("startLng") != null ? ((Number) body.get("startLng")).doubleValue() : 106.7009;
        List<Map<String, Object>> stops = new ArrayList<>((List<Map<String, Object>>) body.getOrDefault("stops", List.of()));
        if (stops.size() <= 1) {
            return Map.of("stops", stops, "totalDistanceMeters", 0);
        }

        List<Map<String, Object>> ordered = new ArrayList<>();
        double curLat = startLat, curLng = startLng;
        List<Map<String, Object>> remaining = new ArrayList<>(stops);
        while (!remaining.isEmpty()) {
            int bestIdx = 0;
            double bestDist = Double.MAX_VALUE;
            for (int i = 0; i < remaining.size(); i++) {
                Map<String, Object> s = remaining.get(i);
                double slat = s.get("lat") != null ? ((Number) s.get("lat")).doubleValue() : 10.7769;
                double slng = s.get("lng") != null ? ((Number) s.get("lng")).doubleValue() : 106.7009;
                double d = NavigationService.haversineMeters(curLat, curLng, slat, slng);
                if (d < bestDist) {
                    bestDist = d;
                    bestIdx = i;
                }
            }
            Map<String, Object> chosen = remaining.remove(bestIdx);
            curLat = chosen.get("lat") != null ? ((Number) chosen.get("lat")).doubleValue() : curLat;
            curLng = chosen.get("lng") != null ? ((Number) chosen.get("lng")).doubleValue() : curLng;
            ordered.add(chosen);
        }

        boolean improved = true;
        while (improved && ordered.size() >= 3) {
            improved = false;
            for (int i = 0; i < ordered.size() - 1; i++) {
                for (int k = i + 1; k < ordered.size(); k++) {
                    double before = routeDist(startLat, startLng, ordered);
                    Collections.reverse(ordered.subList(i, k + 1));
                    double after = routeDist(startLat, startLng, ordered);
                    if (after + 1.0 < before) {
                        improved = true;
                    } else {
                        Collections.reverse(ordered.subList(i, k + 1));
                    }
                }
            }
        }

        int totalDistM = (int) Math.round(routeDist(startLat, startLng, ordered));
        return Map.of(
                "stops", ordered,
                "totalDistanceMeters", totalDistM,
                "estimatedDurationMinutes", Math.max(5, (int) Math.round(totalDistM / 350.0))
        );
    }

    private double routeDist(double startLat, double startLng, List<Map<String, Object>> stops) {
        double total = 0;
        double cLat = startLat, cLng = startLng;
        for (Map<String, Object> s : stops) {
            double slat = s.get("lat") != null ? ((Number) s.get("lat")).doubleValue() : cLat;
            double slng = s.get("lng") != null ? ((Number) s.get("lng")).doubleValue() : cLng;
            total += NavigationService.haversineMeters(cLat, cLng, slat, slng);
            cLat = slat;
            cLng = slng;
        }
        return total;
    }

    @Transactional
    public Map<String, Object> startTrip(UUID id) {
        jdbc.update("UPDATE trip SET status = 'in_progress'::trip_status WHERE id = :id", Map.of("id", id));
        return Map.of("tripId", id, "status", "in_progress");
    }

    @Transactional
    public void deleteTrip(UUID id) {
        jdbc.update("DELETE FROM trip WHERE id = :id", Map.of("id", id));
    }
}

