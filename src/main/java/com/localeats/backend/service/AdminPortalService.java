package com.localeats.backend.service;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class AdminPortalService {

    private final NamedParameterJdbcTemplate jdbc;

    public AdminPortalService(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public Map<String, Object> adminOverview() {
        Integer totalStores = jdbc.queryForObject("SELECT count(*) FROM store", Map.of(), Integer.class);
        Integer activeStores = jdbc.queryForObject("SELECT count(*) FROM store WHERE status = 'active'::store_status", Map.of(), Integer.class);
        Integer pendingStores = jdbc.queryForObject("SELECT count(*) FROM store WHERE status = 'pending'::store_status", Map.of(), Integer.class);
        Integer totalUsers = jdbc.queryForObject("SELECT count(*) FROM app_user", Map.of(), Integer.class);
        Integer totalDishes = jdbc.queryForObject("SELECT count(*) FROM menu_item", Map.of(), Integer.class);
        Integer totalVisits = jdbc.queryForObject("SELECT count(*) FROM store_visit", Map.of(), Integer.class);
        Integer activeNavs = jdbc.queryForObject("SELECT count(*) FROM nav_session WHERE status IN ('started'::nav_session_status,'moving'::nav_session_status,'near_store'::nav_session_status)", Map.of(), Integer.class);
        Integer pendingKyc = jdbc.queryForObject("SELECT count(*) FROM identity_verification WHERE status = 'pending'::verification_status", Map.of(), Integer.class);
        Integer openFraud = jdbc.queryForObject("SELECT count(*) FROM fraud_case WHERE status IN ('open'::fraud_status,'investigating'::fraud_status)", Map.of(), Integer.class);

        List<Map<String, Object>> kycList = jdbc.queryForList("""
                SELECT iv.id, sop.full_name AS "ownerName", u.email, u.phone,
                       iv.status, iv.submitted_at AS "submittedAt", iv.image_delete_at AS "imageDeleteAt"
                FROM identity_verification iv
                JOIN store_owner_profile sop ON sop.id = iv.store_owner_profile_id
                JOIN app_user u ON u.id = sop.user_id
                ORDER BY iv.submitted_at DESC LIMIT 20
                """, Map.of());

        List<Map<String, Object>> routingNodes = jdbc.queryForList("""
                SELECT id, name, provider, base_url AS "baseUrl", region,
                       coverage_radius_km AS "coverageRadiusKm", status, priority
                FROM routing_node ORDER BY priority ASC
                """, Map.of());

        List<Map<String, Object>> liveFleet = jdbc.queryForList("""
                SELECT n.id AS "sessionId", n.user_id AS "userId", n.store_id AS "storeId",
                       s.name AS "storeName", n.status, n.mode,
                       n.last_latitude AS lat, n.last_longitude AS lng,
                       n.distance_to_store_m AS "distanceToStoreMeters", n.last_ping_at AS "lastPingAt"
                FROM nav_session n JOIN store s ON s.id = n.store_id
                ORDER BY n.last_ping_at DESC LIMIT 30
                """, Map.of());

        List<Map<String, Object>> invoices = jdbc.queryForList("""
                SELECT id, invoice_no AS "invoiceNo", buyer_name AS "buyerName",
                       buyer_tax_code AS "buyerTaxCode", subtotal, vat_amount AS "vatAmount",
                       total, status, issued_at AS "issuedAt"
                FROM invoice ORDER BY created_at DESC LIMIT 20
                """, Map.of());

        List<Map<String, Object>> fraudCases = jdbc.queryForList("""
                SELECT id, target_type AS "targetType", target_id AS "targetId",
                       rule_code AS "ruleCode", score, status, penalty_vnd AS "penaltyVnd",
                       evidence, created_at AS "createdAt"
                FROM fraud_case ORDER BY created_at DESC LIMIT 20
                """, Map.of());

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("counts", Map.of(
                "totalStores", totalStores != null ? totalStores : 0,
                "activeStores", activeStores != null ? activeStores : 0,
                "pendingStores", pendingStores != null ? pendingStores : 0,
                "totalUsers", totalUsers != null ? totalUsers : 0,
                "totalDishes", totalDishes != null ? totalDishes : 0,
                "totalVisits", totalVisits != null ? totalVisits : 0,
                "activeNavigations", activeNavs != null ? activeNavs : 0,
                "pendingKyc", pendingKyc != null ? pendingKyc : 0,
                "openFraudCases", openFraud != null ? openFraud : 0
        ));
        out.put("kycQueue", kycList);
        out.put("routingNodes", routingNodes);
        out.put("liveFleet", liveFleet);
        out.put("invoices", invoices);
        out.put("fraudCases", fraudCases);
        return out;
    }

    @Transactional
    public Map<String, Object> adminCreateStore(Map<String, Object> body) {
        UUID storeId = UUID.randomUUID();
        UUID ownerId = UUID.fromString("66666666-6666-6666-6666-666666666699");
        String name = String.valueOf(body.getOrDefault("name", "Quán mới"));
        String address = String.valueOf(body.getOrDefault("address", "TP. HCM"));
        String district = String.valueOf(body.getOrDefault("district", "Quận 1"));
        double lat = body.get("lat") != null ? ((Number) body.get("lat")).doubleValue() : 10.7769;
        double lng = body.get("lng") != null ? ((Number) body.get("lng")).doubleValue() : 106.7009;
        String specialty = String.valueOf(body.getOrDefault("specialty", "Món ngon đặc trưng"));

        jdbc.update("""
                INSERT INTO store (id, owner_id, name, address, district, latitude, longitude, specialty, price_min, price_max, status, rating_avg)
                VALUES (:id, :oid, :n, :a, :d, :lat, :lng, :sp, 35000, 85000, 'active'::store_status, 4.7)
                """, new MapSqlParameterSource()
                .addValue("id", storeId)
                .addValue("oid", ownerId)
                .addValue("n", name)
                .addValue("a", address)
                .addValue("d", district)
                .addValue("lat", lat)
                .addValue("lng", lng)
                .addValue("sp", specialty));

        logAudit("store.create", "store", storeId);
        return Map.of("storeId", storeId);
    }

    @Transactional
    public String adminUpdateStoreStatus(UUID id, Map<String, Object> body) {
        String st = String.valueOf(body.getOrDefault("status", "active"));
        if (!List.of("pending", "active", "hidden", "removed").contains(st)) st = "active";
        jdbc.update("""
                UPDATE store SET status = CAST(:st AS store_status),
                                 approved_at = CASE WHEN :st = 'active' THEN now() ELSE approved_at END
                WHERE id = :id
                """, Map.of("st", st, "id", id));
        logAudit("store.status." + st, "store", id);
        return st;
    }

    public List<Map<String, Object>> adminListUsers() {
        return jdbc.queryForList("""
                SELECT u.id, u.phone, u.email, u.role, u.is_verified AS verified,
                       u.is_premium AS premium, u.is_locked AS locked, u.created_at AS "createdAt",
                       sop.status AS "ownerStatus", sop.full_name AS "ownerName"
                FROM app_user u
                LEFT JOIN store_owner_profile sop ON sop.user_id = u.id
                ORDER BY u.created_at DESC LIMIT 100
                """, Map.of());
    }

    @Transactional
    public boolean adminToggleUserLock(UUID id, Map<String, Object> body) {
        boolean locked = Boolean.TRUE.equals(body.get("locked"));
        jdbc.update("UPDATE app_user SET is_locked = :l WHERE id = :id", Map.of("l", locked, "id", id));
        logAudit(locked ? "user.lock" : "user.unlock", "app_user", id);
        return locked;
    }

    @Transactional
    public String adminReviewKyc(UUID id, Map<String, Object> body) {
        String st = String.valueOf(body.getOrDefault("status", "approved"));
        if (!List.of("approved", "rejected", "pending").contains(st)) st = "approved";
        jdbc.update("""
                UPDATE identity_verification
                SET status = CAST(:st AS verification_status),
                    reviewed_at = now(),
                    image_delete_at = CASE WHEN :st = 'approved' THEN now() + INTERVAL '7 days' ELSE image_delete_at END
                WHERE id = :id
                """, Map.of("st", st, "id", id));
        logAudit("kyc." + st, "identity_verification", id);
        return st;
    }

    public List<Map<String, Object>> adminListReports() {
        return jdbc.queryForList("""
                SELECT id, reporter_id AS "reporterId", target_type AS "targetType",
                       target_id AS "targetId", reason, status, created_at AS "createdAt"
                FROM report ORDER BY created_at DESC LIMIT 50
                """, Map.of());
    }

    @Transactional
    public void adminResolveReport(UUID id, Map<String, Object> body) {
        String st = String.valueOf(body.getOrDefault("status", "resolved"));
        if (!List.of("pending", "resolved", "dismissed").contains(st)) st = "resolved";
        jdbc.update("UPDATE report SET status = CAST(:st AS report_status), resolved_at = now() WHERE id = :id",
                Map.of("st", st, "id", id));
        logAudit("report." + st, "report", id);
    }

    @Transactional
    public void adminUpdateFraudCase(UUID id, Map<String, Object> body) {
        String st = String.valueOf(body.getOrDefault("status", "confirmed"));
        if (!List.of("open", "investigating", "confirmed", "dismissed").contains(st)) st = "confirmed";
        jdbc.update("UPDATE fraud_case SET status = CAST(:st AS fraud_status), resolved_at = now() WHERE id = :id",
                Map.of("st", st, "id", id));
        logAudit("fraud." + st, "fraud_case", id);
    }

    public List<Map<String, Object>> adminListKol() {
        return jdbc.queryForList("""
                SELECT k.user_id AS "userId", u.email, u.phone, k.tier,
                       k.followers_count AS "followersCount", k.commission_rate AS "commissionRate",
                       k.total_earned_vnd AS "totalEarnedVnd", k.verified_at AS "verifiedAt"
                FROM kol_profile k JOIN app_user u ON u.id = k.user_id
                ORDER BY k.total_earned_vnd DESC
                """, Map.of());
    }

    public List<Map<String, Object>> adminListRoles() {
        return jdbc.queryForList("SELECT id, name, description FROM admin_role ORDER BY id ASC", Map.of());
    }

    public List<Map<String, Object>> adminListAudit() {
        return jdbc.queryForList("""
                SELECT id, actor_id AS "actorId", action, entity AS "targetType",
                       entity_id AS "targetId", ip_address AS "ipAddress", created_at AS "createdAt"
                FROM audit_log ORDER BY created_at DESC LIMIT 50
                """, Map.of());
    }

    public List<Map<String, Object>> adminListAiModels() {
        return jdbc.queryForList("""
                SELECT id, name, version, provider, params, is_active AS "isActive", updated_at AS "updatedAt"
                FROM ai_model_config ORDER BY id ASC
                """, Map.of());
    }

    private void logAudit(String action, String entity, UUID entityId) {
        try {
            jdbc.update("""
                    INSERT INTO audit_log (actor_id, action, entity, entity_id)
                    VALUES ('11111111-1111-1111-1111-111111111111', :act, :ent, :eid)
                    """, Map.of("act", action, "ent", entity, "eid", entityId != null ? entityId.toString() : ""));
        } catch (Exception ignored) {}
    }
}
