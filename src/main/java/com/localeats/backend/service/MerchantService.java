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
                "SELECT id, name, address, district, phone, latitude, longitude, specialty, price_min, price_max, rating_avg, review_count, vote_count, visit_count, status FROM store WHERE id = :id",
                Map.of("id", sid));

        Map<String, Object> stats = jdbc.queryForMap("""
                SELECT COALESCE(SUM(search_count), 0) AS total_searches,
                       COALESCE(SUM(view_count), 0) AS total_views,
                       COALESCE(SUM(route_requested_count), 0) AS total_routes,
                       COALESCE(SUM(visit_confirmed_count), 0) AS total_visits
                FROM store_visit_stat WHERE store_id = :sid
                """, Map.of("sid", sid));

        List<Map<String, Object>> menu = menuService.getStoreMenu(sid, true);

        List<Map<String, Object>> recentVisits = jdbc.queryForList("""
                SELECT v.id, v.arrived_at AS "arrivedAt", v.dwell_seconds AS "dwellSeconds",
                       v.travel_distance_m AS "travelDistanceMeters", v.mode,
                       COALESCE(u.email, u.phone, 'Thực khách GPS') AS "visitor"
                FROM store_visit v LEFT JOIN app_user u ON u.id = v.user_id
                WHERE v.store_id = :sid ORDER BY v.arrived_at DESC LIMIT 20
                """, Map.of("sid", sid));

        List<Map<String, Object>> activeNavs = jdbc.queryForList("""
                SELECT id AS "sessionId", status, mode, last_latitude AS lat, last_longitude AS lng,
                       distance_to_store_m AS "distanceMeters", last_ping_at AS "lastPingAt"
                FROM nav_session
                WHERE store_id = :sid AND status IN ('started'::nav_session_status, 'moving'::nav_session_status, 'near_store'::nav_session_status)
                ORDER BY last_ping_at DESC LIMIT 20
                """, Map.of("sid", sid));

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("store", store);
        out.put("stats", stats);
        out.put("menu", menu);
        out.put("recentVisits", recentVisits);
        out.put("activeNavigations", activeNavs);
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
        UUID oid = UUID.fromString("66666666-6666-6666-6666-666666666661");
        String title = String.valueOf(body.getOrDefault("title", "Chiến dịch ưu đãi thực khách GPS"));
        String desc = String.valueOf(body.getOrDefault("description", "Ưu đãi dành riêng cho khách hàng đến quán"));
        String code = String.valueOf(body.getOrDefault("voucherCode", "VIP" + cid.toString().substring(0, 4).toUpperCase()));
        double budget = body.get("budgetVnd") != null ? ((Number) body.get("budgetVnd")).doubleValue() : 2000000.0;
        jdbc.update("""
                INSERT INTO ad_campaign (id, store_id, owner_id, title, description, type, status, budget_vnd, discount_value, voucher_code, voucher_quota, require_visit, start_at, end_at)
                VALUES (:id, :sid, :oid, :t, :d, 'sponsored_pin'::ad_campaign_type, 'running'::ad_campaign_status, :b, 'Giảm 25%', :vc, 200, TRUE, now(), now() + INTERVAL '30 days')
                """, Map.of("id", cid, "sid", sid, "oid", oid, "t", title, "d", desc, "b", budget, "vc", code));
        return Map.of("campaignId", cid, "voucherCode", code);
    }

    @Transactional
    public Map<String, Object> submitKyc(Map<String, Object> body) {
        UUID kycId = UUID.randomUUID();
        UUID ownerProfileId = UUID.fromString("66666666-6666-6666-6666-666666666661");
        String front = String.valueOf(body.getOrDefault("idCardFrontUrl", "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80"));
        String back = String.valueOf(body.getOrDefault("idCardBackUrl", "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80"));
        String lic = String.valueOf(body.getOrDefault("licenseImageUrl", "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&q=80"));
        String idHash = AuthService.sha256Hex(String.valueOf(body.getOrDefault("idNumber", UUID.randomUUID().toString())));

        jdbc.update("""
                INSERT INTO identity_verification (id, store_owner_profile_id, id_card_front_url, id_card_back_url, license_image_url, id_number_hash, status)
                VALUES (:id, :op, :f, :b, :l, :h, 'pending'::verification_status)
                """, Map.of("id", kycId, "op", ownerProfileId, "f", front, "b", back, "l", lic, "h", idHash));
        return Map.of("kycId", kycId);
    }
}

