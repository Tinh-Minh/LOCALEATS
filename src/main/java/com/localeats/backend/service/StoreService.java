package com.localeats.backend.service;

import com.localeats.backend.entity.AppUser;
import com.localeats.backend.exception.BadRequestException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.NumberFormat;
import java.util.*;

@Service
public class StoreService {

    private final NamedParameterJdbcTemplate jdbc;
    private final NavigationService navigationService;
    private final MenuService menuService;

    public StoreService(NamedParameterJdbcTemplate jdbc,
                        NavigationService navigationService,
                        MenuService menuService) {
        this.jdbc = jdbc;
        this.navigationService = navigationService;
        this.menuService = menuService;
    }

    public List<Map<String, Object>> listCategories() {
        return jdbc.queryForList(
                "SELECT id, code, name, icon, kind, sort_order AS \"sortOrder\" FROM category ORDER BY kind, sort_order, id",
                Map.of());
    }

    public List<Map<String, Object>> listStores(AppUser user, Double lat, Double lng,
                                                Integer radiusMeters, String q,
                                                String district, String category, int limit) {
        double uLat = lat != null ? lat : 10.7769;
        double uLng = lng != null ? lng : 106.7009;
        int safeLimit = Math.min(500, Math.max(1, limit));

        StringBuilder sql = new StringBuilder("""
                SELECT s.id, s.name, s.address, s.district, s.phone,
                       s.latitude, s.longitude, s.specialty,
                       s.price_min, s.price_max, s.avg_wait_minutes,
                       s.logo_url, s.cover_image_url, s.status,
                       s.rating_avg, s.review_count, s.vote_count, s.visit_count,
                       s.is_sponsored, s.close_time,
                       fn_haversine_m(:lat, :lng, s.latitude::float8, s.longitude::float8) AS dist_m,
                       (SELECT c.name FROM store_category sc JOIN category c ON c.id = sc.category_id WHERE sc.store_id = s.id LIMIT 1) AS category_name
                FROM store s
                WHERE s.status = 'active'::store_status
                """);

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("lat", uLat)
                .addValue("lng", uLng)
                .addValue("lim", safeLimit);

        if (q != null && !q.isBlank()) {
            sql.append(" AND (lower(s.name) LIKE :q OR lower(s.address) LIKE :q OR lower(COALESCE(s.specialty,'')) LIKE :q)");
            params.addValue("q", "%" + q.trim().toLowerCase() + "%");
        }
        if (district != null && !district.isBlank() && !"all".equalsIgnoreCase(district)) {
            sql.append(" AND lower(COALESCE(s.district,'')) LIKE :dist");
            params.addValue("dist", "%" + district.trim().toLowerCase() + "%");
        }
        if (radiusMeters != null && radiusMeters > 0) {
            sql.append(" AND fn_haversine_m(:lat, :lng, s.latitude::float8, s.longitude::float8) <= :rad");
            params.addValue("rad", radiusMeters);
        }

        if (lat != null && lng != null) {
            sql.append(" ORDER BY s.is_sponsored DESC, dist_m ASC LIMIT :lim");
        } else {
            sql.append(" ORDER BY s.is_sponsored DESC, s.vote_count DESC, s.rating_avg DESC LIMIT :lim");
        }

        List<Map<String, Object>> raw = jdbc.queryForList(sql.toString(), params);
        List<Map<String, Object>> mapped = new ArrayList<>(raw.size());
        int rank = 1;
        for (Map<String, Object> r : raw) {
            mapped.add(toFrontendPlace(r, rank++));
        }

        if (q != null && !q.isBlank()) {
            try {
                jdbc.update("INSERT INTO search_log (user_id, query, latitude, longitude, result_count) VALUES (:uid, :q, :lat, :lng, :cnt)",
                        new MapSqlParameterSource()
                                .addValue("uid", user != null ? user.getId() : null)
                                .addValue("q", q.trim())
                                .addValue("lat", uLat)
                                .addValue("lng", uLng)
                                .addValue("cnt", mapped.size()));
                for (int i = 0; i < Math.min(5, raw.size()); i++) {
                    UUID sid = (UUID) raw.get(i).get("id");
                    navigationService.incrementDailyStat(sid, 1, 0, 0);
                }
            } catch (Exception ignored) {}
        }

        return mapped;
    }

    public List<Map<String, Object>> hotStores(String range, String district, Double lat, Double lng) {
        double uLat = lat != null ? lat : 10.7769;
        double uLng = lng != null ? lng : 106.7009;
        StringBuilder sql = new StringBuilder("""
                SELECT s.id, s.name, s.address, s.district, s.phone,
                       s.latitude, s.longitude, s.specialty,
                       s.price_min, s.price_max, s.avg_wait_minutes,
                       s.logo_url, s.cover_image_url, s.status,
                       s.rating_avg, s.review_count, s.vote_count, s.visit_count,
                       s.is_sponsored, s.close_time,
                       fn_haversine_m(:lat, :lng, s.latitude::float8, s.longitude::float8) AS dist_m,
                       (SELECT c.name FROM store_category sc JOIN category c ON c.id = sc.category_id WHERE sc.store_id = s.id LIMIT 1) AS category_name
                FROM store s
                WHERE s.status = 'active'::store_status
                """);
        MapSqlParameterSource p = new MapSqlParameterSource().addValue("lat", uLat).addValue("lng", uLng);
        if (district != null && !district.isBlank() && !"all".equalsIgnoreCase(district)) {
            sql.append(" AND lower(COALESCE(s.district,'')) LIKE :d");
            p.addValue("d", "%" + district.trim().toLowerCase() + "%");
        }
        sql.append(" ORDER BY (s.vote_count + s.visit_count * 3) DESC, s.rating_avg DESC LIMIT 60");
        List<Map<String, Object>> raw = jdbc.queryForList(sql.toString(), p);
        List<Map<String, Object>> out = new ArrayList<>();
        int rank = 1;
        for (Map<String, Object> r : raw) {
            out.add(toFrontendPlace(r, rank++));
        }
        return out;
    }

    public Map<String, Object> getStoreDetail(AppUser user, UUID id, Double lat, Double lng) {
        double uLat = lat != null ? lat : 10.7769;
        double uLng = lng != null ? lng : 106.7009;
        List<Map<String, Object>> rows = jdbc.queryForList("""
                SELECT s.*, fn_haversine_m(:lat, :lng, s.latitude::float8, s.longitude::float8) AS dist_m,
                       (SELECT c.name FROM store_category sc JOIN category c ON c.id = sc.category_id WHERE sc.store_id = s.id LIMIT 1) AS category_name
                FROM store s WHERE s.id = :id
                """, Map.of("id", id, "lat", uLat, "lng", uLng));
        if (rows.isEmpty()) {
            throw new BadRequestException("Không tìm thấy quán ăn");
        }
        Map<String, Object> place = toFrontendPlace(rows.get(0), 1);
        place.put("menu", menuService.getStoreMenu(id, false));

        navigationService.recordStoreEvent(id, user != null ? user.getId() : null, "view", Map.of());
        navigationService.incrementDailyStat(id, 0, 1, 0);
        return place;
    }

    @Transactional
    public Map<String, Object> voteStore(AppUser user, UUID id) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333332");
        jdbc.update("""
                INSERT INTO store_vote (user_id, store_id, voted_on)
                VALUES (:uid, :sid, CURRENT_DATE)
                ON CONFLICT DO NOTHING
                """, Map.of("uid", uid, "sid", id));
        jdbc.update("UPDATE store SET vote_count = vote_count + 1 WHERE id = :sid", Map.of("sid", id));
        Integer votes = jdbc.queryForObject("SELECT vote_count FROM store WHERE id = :sid", Map.of("sid", id), Integer.class);
        return Map.of("storeId", id, "votes", votes != null ? votes : 1);
    }

    public List<Map<String, Object>> getSavedStores(AppUser user) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333332");
        List<Map<String, Object>> raw = jdbc.queryForList("""
                SELECT s.*, 1200.0 AS dist_m,
                       (SELECT c.name FROM store_category sc JOIN category c ON c.id = sc.category_id WHERE sc.store_id = s.id LIMIT 1) AS category_name
                FROM saved_store sv
                JOIN store s ON s.id = sv.store_id
                WHERE sv.user_id = :uid
                ORDER BY sv.created_at DESC
                """, Map.of("uid", uid));
        List<Map<String, Object>> out = new ArrayList<>();
        int r = 1;
        for (Map<String, Object> row : raw) out.add(toFrontendPlace(row, r++));
        return out;
    }

    @Transactional
    public void saveStore(AppUser user, UUID id) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333332");
        jdbc.update("INSERT INTO saved_store (user_id, store_id) VALUES (:u, :s) ON CONFLICT DO NOTHING", Map.of("u", uid, "s", id));
    }

    @Transactional
    public void unsaveStore(AppUser user, UUID id) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333332");
        jdbc.update("DELETE FROM saved_store WHERE user_id = :u AND store_id = :s", Map.of("u", uid, "s", id));
    }

    public static Map<String, Object> toFrontendPlace(Map<String, Object> r, int rank) {
        Map<String, Object> m = new LinkedHashMap<>();
        UUID id = (UUID) r.get("id");
        double lat = ((Number) r.get("latitude")).doubleValue();
        double lng = ((Number) r.get("longitude")).doubleValue();
        double distM = r.get("dist_m") != null ? ((Number) r.get("dist_m")).doubleValue() : 1200.0;
        double distKm = Math.round((distM / 1000.0) * 10.0) / 10.0;
        int pMin = r.get("price_min") != null ? ((Number) r.get("price_min")).intValue() : 35000;
        int pMax = r.get("price_max") != null ? ((Number) r.get("price_max")).intValue() : 85000;
        NumberFormat nf = NumberFormat.getInstance(new Locale("vi", "VN"));

        m.put("id", id.toString());
        m.put("storeId", id.toString());
        m.put("name", r.get("name"));
        m.put("address", r.get("address"));
        m.put("district", r.get("district") != null ? r.get("district") : "Quận 1");
        m.put("phone", r.get("phone"));
        m.put("rating", r.get("rating_avg") != null ? ((Number) r.get("rating_avg")).doubleValue() : 4.6);
        m.put("reviews", r.get("review_count") != null ? ((Number) r.get("review_count")).intValue() : 18);
        m.put("price", nf.format(pMin) + "đ - " + nf.format(pMax) + "đ");
        m.put("priceMin", pMin);
        m.put("priceMax", pMax);
        m.put("hot", rank <= 25 || Boolean.TRUE.equals(r.get("is_sponsored")));
        m.put("isSponsored", Boolean.TRUE.equals(r.get("is_sponsored")));
        m.put("lat", lat);
        m.put("lng", lng);
        m.put("category", r.get("category_name") != null ? r.get("category_name") : "Quán ăn");
        String img = r.get("cover_image_url") != null ? String.valueOf(r.get("cover_image_url"))
                : (r.get("logo_url") != null ? String.valueOf(r.get("logo_url"))
                : "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80");
        m.put("image", img);
        m.put("votes", r.get("vote_count") != null ? ((Number) r.get("vote_count")).intValue() : 120);
        m.put("visits", r.get("visit_count") != null ? ((Number) r.get("visit_count")).intValue() : 45);
        m.put("trend", "+" + Math.max(18, 190 - rank * 3) + "%");
        m.put("specialty", r.get("specialty") != null ? r.get("specialty") : "Món ngon đặc trưng");
        m.put("openNow", true);
        m.put("closeAt", r.get("close_time") != null ? String.valueOf(r.get("close_time")).substring(0, 5) : "22:30");
        m.put("distanceKm", distKm);
        m.put("distanceMeters", Math.round(distM));
        m.put("bikeMin", Math.max(2, (int) Math.round(distM / 416.0)));
        m.put("carMin", Math.max(4, (int) Math.round(distM / 300.0)));
        m.put("walkMin", Math.max(5, (int) Math.round(distM / 80.0)));
        m.put("trendRank", rank);
        int wait = r.get("avg_wait_minutes") != null ? ((Number) r.get("avg_wait_minutes")).intValue() : 10;
        m.put("waitTime", wait + " phút");
        return m;
    }
}

