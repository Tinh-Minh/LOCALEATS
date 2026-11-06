package com.localeats.backend.service;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class MerchantService {

    private final NamedParameterJdbcTemplate jdbc;
    private final MenuService menuService;

    public MerchantService(NamedParameterJdbcTemplate jdbc, MenuService menuService) {
        this.jdbc = jdbc;
        this.menuService = menuService;
    }

    private UUID resolveMerchantStoreId(UUID requestedStoreId) {
        if (requestedStoreId != null) return requestedStoreId;
        return UUID.fromString("88888888-0000-0000-0000-000000000001");
    }

    public Map<String, Object> merchantOverview(UUID storeId) {
        UUID sid = resolveMerchantStoreId(storeId);
        Map<String, Object> store = jdbc.queryForMap(
                "SELECT id, name, address, district, phone, latitude, longitude, specialty, price_min, price_max, rating_avg, review_count, vote_count, visit_count, status, opening_hours::text AS \"openingHours\" FROM store WHERE id = :id",
                Map.of("id", sid));

        List<Map<String, Object>> allStores = jdbc.queryForList(
                "SELECT id, name, address, district, rating_avg AS rating, review_count AS reviews, visit_count AS visits, status FROM store ORDER BY visit_count DESC, rating_avg DESC LIMIT 30",
                Map.of());

        Map<String, Object> stats = jdbc.queryForMap("""
                SELECT COALESCE(SUM(search_count), 0) AS total_searches,
                       COALESCE(SUM(view_count), 0) AS total_views,
                       COALESCE(SUM(route_requested_count), 0) AS total_routes,
                       COALESCE(SUM(visit_confirmed_count), 0) AS total_visits
                FROM store_visit_stat WHERE store_id = :sid
                """, Map.of("sid", sid));

        List<Map<String, Object>> dailyStats = jdbc.queryForList("""
                SELECT stat_date AS "statDate", search_count AS "searchCount",
                       view_count AS "viewCount", route_requested_count AS "routeCount",
                       visit_confirmed_count AS "visitCount", avg_dwell_seconds AS "avgDwellSeconds"
                FROM store_visit_stat
                WHERE store_id = :sid
                ORDER BY stat_date DESC LIMIT 14
                """, Map.of("sid", sid));

        List<Map<String, Object>> menu = menuService.getStoreMenu(sid, true);

        List<Map<String, Object>> recentVisits = jdbc.queryForList("""
                SELECT v.id, v.arrived_at AS "arrivedAt", v.dwell_seconds AS "dwellSeconds",
                       v.travel_distance_m AS "travelDistanceMeters", v.mode,
                       COALESCE(u.email, u.phone, 'Thực khách GPS') AS "visitor"
                FROM store_visit v LEFT JOIN app_user u ON u.id = v.user_id
                WHERE v.store_id = :sid ORDER BY v.arrived_at DESC LIMIT 25
                """, Map.of("sid", sid));

        List<Map<String, Object>> activeNavs = jdbc.queryForList("""
                SELECT n.id AS "sessionId", n.status, n.mode, n.last_latitude AS lat, n.last_longitude AS lng,
                       n.distance_to_store_m AS "distanceMeters",
                       COALESCE(EXTRACT(EPOCH FROM (now() - n.dwell_started_at))::int, 0) AS "dwellSeconds",
                       n.last_ping_at AS "lastPingAt", COALESCE(u.email, u.phone, 'Thực khách GPS') AS "visitor"
                FROM nav_session n
                LEFT JOIN app_user u ON u.id = n.user_id
                WHERE n.store_id = :sid AND n.status IN ('started'::nav_session_status, 'moving'::nav_session_status, 'near_store'::nav_session_status)
                ORDER BY n.last_ping_at DESC LIMIT 25
                """, Map.of("sid", sid));

        List<Map<String, Object>> campaigns = jdbc.queryForList("""
                SELECT id, title, description, type, status, budget AS "budgetVnd",
                       spent AS "spentVnd", discount_value AS "discountValue",
                       voucher_code AS "voucherCode", voucher_quota AS "voucherQuota",
                       0 AS "voucherClaimed", start_at AS "startAt", end_at AS "endAt"
                FROM ad_campaign
                WHERE store_id = :sid OR store_id IS NOT NULL
                ORDER BY created_at DESC LIMIT 20
                """, Map.of("sid", sid));

        List<Map<String, Object>> reviews = jdbc.queryForList("""
                SELECT r.id, r.rating, r.comment AS content, r.is_verified_visit AS "verifiedVisit",
                       r.like_count AS "likesCount", r.created_at AS "createdAt",
                       COALESCE(up.display_name, u.email, u.phone, 'Thực khách LocalEats') AS "authorName",
                       up.avatar_url AS "avatarUrl",
                       rr.content AS "replyContent", rr.created_at AS "repliedAt"
                FROM review r
                LEFT JOIN app_user u ON u.id = r.user_id
                LEFT JOIN user_profile up ON up.user_id = r.user_id
                LEFT JOIN review_reply rr ON rr.review_id = r.id
                WHERE r.store_id = :sid
                ORDER BY r.created_at DESC LIMIT 30
                """, Map.of("sid", sid));

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("store", store);
        out.put("allStores", allStores);
        out.put("stats", stats);
        out.put("dailyStats", dailyStats);
        out.put("menu", menu);
        out.put("recentVisits", recentVisits);
        out.put("activeNavigations", activeNavs);
        out.put("campaigns", campaigns);
        out.put("reviews", reviews);
        return out;
    }

    @Transactional
    public void updateStore(UUID id, Map<String, Object> body) {
        String name = String.valueOf(body.getOrDefault("name", "Quán ẩm thực"));
        String address = String.valueOf(body.getOrDefault("address", ""));
        String phone = String.valueOf(body.getOrDefault("phone", ""));
        String specialty = String.valueOf(body.getOrDefault("specialty", ""));
        jdbc.update("""
                UPDATE store SET name = COALESCE(NULLIF(:n,''), name),
                                 address = COALESCE(NULLIF(:a,''), address),
                                 phone = COALESCE(NULLIF(:p,''), phone),
                                 specialty = COALESCE(NULLIF(:s,''), specialty),
                                 last_edited_at = now(), updated_at = now()
                WHERE id = :id
                """, Map.of("id", id, "n", name, "a", address, "p", phone, "s", specialty));
    }

    @Transactional
    public Map<String, Object> createCampaign(Map<String, Object> body) {
        UUID cid = UUID.randomUUID();
        UUID sid = body.get("storeId") != null ? UUID.fromString(String.valueOf(body.get("storeId")))
                : UUID.fromString("88888888-0000-0000-0000-000000000001");
        String title = String.valueOf(body.getOrDefault("title", "Chiến dịch ưu đãi thực khách GPS"));
        String desc = String.valueOf(body.getOrDefault("description", "Ưu đãi dành riêng cho khách hàng đến quán"));
        String code = String.valueOf(body.getOrDefault("voucherCode", "VIP" + cid.toString().substring(0, 4).toUpperCase()));
        double budget = body.get("budgetVnd") != null ? ((Number) body.get("budgetVnd")).doubleValue() : 2000000.0;
        jdbc.update("""
                INSERT INTO ad_campaign (id, store_id, title, description, type, status, budget, discount_value, voucher_code, voucher_quota, require_visit, start_at, end_at)
                VALUES (:id, :sid, :t, :d, 'sponsored_pin'::ad_campaign_type, 'running'::ad_campaign_status, :b, 25, :vc, 200, TRUE, now(), now() + INTERVAL '30 days')
                """, Map.of("id", cid, "sid", sid, "t", title, "d", desc, "b", budget, "vc", code));
        return Map.of("campaignId", cid, "voucherCode", code);
    }

    @Transactional
    public Map<String, Object> submitKyc(Map<String, Object> body) {
        UUID kycId = UUID.randomUUID();
        UUID ownerProfileId = jdbc.queryForObject("SELECT id FROM store_owner_profile LIMIT 1", Map.of(), UUID.class);
        String front = String.valueOf(body.getOrDefault("idCardFrontUrl", "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80"));

        jdbc.update("""
                INSERT INTO identity_verification (id, store_owner_profile_id, image_path_encrypted, status)
                VALUES (:id, :op, :f, 'pending'::verification_status)
                """, Map.of("id", kycId, "op", ownerProfileId, "f", front));
        return Map.of("kycId", kycId);
    }
}

