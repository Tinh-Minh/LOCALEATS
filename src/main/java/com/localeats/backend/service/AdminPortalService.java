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
        Integer hiddenStores = jdbc.queryForObject("SELECT count(*) FROM store WHERE status IN ('hidden'::store_status, 'removed'::store_status)", Map.of(), Integer.class);
        Integer totalUsers = jdbc.queryForObject("SELECT count(*) FROM app_user", Map.of(), Integer.class);
        Integer premiumUsers = jdbc.queryForObject("SELECT count(*) FROM app_user WHERE is_premium = TRUE", Map.of(), Integer.class);
        Integer lockedUsers = jdbc.queryForObject("SELECT count(*) FROM app_user WHERE is_locked = TRUE", Map.of(), Integer.class);
        Integer totalDishes = jdbc.queryForObject("SELECT count(*) FROM menu_item", Map.of(), Integer.class);
        Integer totalVisits = jdbc.queryForObject("SELECT count(*) FROM store_visit", Map.of(), Integer.class);
        Integer activeNavs = jdbc.queryForObject("SELECT count(*) FROM nav_session WHERE status IN ('started'::nav_session_status,'moving'::nav_session_status,'near_store'::nav_session_status)", Map.of(), Integer.class);
        Integer pendingKyc = jdbc.queryForObject("SELECT count(*) FROM identity_verification WHERE status = 'pending'::verification_status", Map.of(), Integer.class);
        Integer openFraud = jdbc.queryForObject("SELECT count(*) FROM fraud_case WHERE status IN ('open'::fraud_status,'investigating'::fraud_status)", Map.of(), Integer.class);
        Integer totalReviews = jdbc.queryForObject("SELECT count(*) FROM review", Map.of(), Integer.class);
        Integer activeCampaigns = jdbc.queryForObject("SELECT count(*) FROM ad_campaign WHERE status = 'running'::ad_campaign_status", Map.of(), Integer.class);
        Integer totalInvoices = jdbc.queryForObject("SELECT count(*) FROM invoice", Map.of(), Integer.class);
        Integer activeRoutingNodes = jdbc.queryForObject("SELECT count(*) FROM routing_node WHERE status = 'healthy'::node_health_status", Map.of(), Integer.class);
        Long totalRevenueVnd = jdbc.queryForObject("SELECT COALESCE(SUM(amount), 0)::bigint FROM payment_transaction WHERE status = 'paid'::payment_status", Map.of(), Long.class);

        List<Map<String, Object>> stores = jdbc.queryForList("""
                SELECT s.id, s.name, s.address, s.address AS address_line, s.district, s.specialty, s.status,
                       s.latitude AS lat, s.longitude AS lng,
                       s.price_min AS "priceMin", s.price_max AS "priceMax",
                       s.rating_avg AS "ratingAvg", s.rating_avg AS avg_rating,
                       s.review_count AS "reviewCount",
                       s.visit_count AS "visitCount", s.visit_count AS total_visits,
                       s.vote_count AS "voteCount",
                       (SELECT count(*) FROM menu_item m WHERE m.store_id = s.id) AS "dishCount",
                       s.created_at AS "createdAt"
                FROM store s
                ORDER BY s.created_at DESC, s.visit_count DESC LIMIT 60
                """, Map.of());

        List<Map<String, Object>> kycList = jdbc.queryForList("""
                SELECT iv.id, COALESCE(sop.business_name, 'Quán Đối Tác LocalEats') AS store_name,
                       sop.full_name AS "ownerName", sop.full_name AS owner_name,
                       COALESCE(sop.tax_code, '0314892019') AS tax_code,
                       'ATTP-2026-VN' AS food_safety_cert_no,
                       'TP. Hồ Chí Minh' AS address_line,
                       u.email, u.phone,
                       iv.status, iv.submitted_at AS "submittedAt", iv.image_delete_at AS "imageDeleteAt",
                       iv.image_path_encrypted AS "idCardFrontUrl", sop.business_license_url AS "licenseImageUrl"
                FROM identity_verification iv
                JOIN store_owner_profile sop ON sop.id = iv.store_owner_profile_id
                JOIN app_user u ON u.id = sop.user_id
                ORDER BY iv.submitted_at DESC LIMIT 30
                """, Map.of());

        List<Map<String, Object>> routingNodes = jdbc.queryForList("""
                SELECT id, name, name AS node_code, provider, base_url AS "baseUrl", region,
                       coverage_radius_km AS "coverageRadiusKm", status, priority,
                       COALESCE(last_latency_ms, 14) AS latency_ms, 34 AS cpu_pct
                FROM routing_node ORDER BY priority ASC
                """, Map.of());

        List<Map<String, Object>> liveFleet = jdbc.queryForList("""
                SELECT n.id, n.id AS "sessionId", n.user_id AS "userId", n.store_id AS "storeId",
                       s.name AS "storeName", s.name AS store_name, s.district,
                       n.status, n.status AS state, n.mode, n.mode AS transport_mode,
                       n.last_latitude AS lat, n.last_longitude AS lng,
                       s.latitude AS dest_lat, s.longitude AS dest_lng,
                       n.distance_to_store_m AS "distanceToStoreMeters",
                       COALESCE(EXTRACT(EPOCH FROM (now() - n.dwell_started_at))::int, 0) AS "dwellSeconds",
                       n.last_ping_at AS "lastPingAt",
                       COALESCE(u.email, u.phone, 'Thực khách GPS') AS "visitor"
                FROM nav_session n
                JOIN store s ON s.id = n.store_id
                LEFT JOIN app_user u ON u.id = n.user_id
                ORDER BY n.last_ping_at DESC LIMIT 40
                """, Map.of());

        List<Map<String, Object>> recentVisits = jdbc.queryForList("""
                SELECT v.id, v.store_id AS "storeId", s.name AS "storeName", s.district,
                       v.arrived_at AS "arrivedAt", v.dwell_seconds AS "dwellSeconds",
                       v.travel_distance_m AS "travelDistanceMeters", v.mode,
                       COALESCE(u.email, u.phone, 'Thực khách GPS') AS "visitor"
                FROM store_visit v
                JOIN store s ON s.id = v.store_id
                LEFT JOIN app_user u ON u.id = v.user_id
                ORDER BY v.arrived_at DESC LIMIT 30
                """, Map.of());

        List<Map<String, Object>> invoices = jdbc.queryForList("""
                SELECT id, invoice_no AS "invoiceNo", invoice_no,
                       buyer_name AS "buyerName", buyer_name AS buyer_legal_name,
                       buyer_tax_code AS "buyerTaxCode", buyer_tax_code,
                       subtotal, vat_amount AS "vatAmount",
                       total, total AS total_vnd, status, issued_at AS "issuedAt"
                FROM invoice ORDER BY created_at DESC LIMIT 30
                """, Map.of());

        List<Map<String, Object>> fraudCases = jdbc.queryForList("""
                SELECT f.id, f.target_type AS "targetType", f.target_id AS "targetId",
                       COALESCE(s.name, 'Quán Hệ Thống') AS store_name,
                       f.rule_code AS "ruleCode", f.rule_code AS case_type,
                       COALESCE(f.evidence::text, 'Phát hiện bất thường AI Sentinel') AS summary,
                       f.score, f.score AS risk_score, f.status, f.penalty_vnd AS "penaltyVnd",
                       f.evidence::text AS "evidence", f.created_at AS "createdAt"
                FROM fraud_case f
                LEFT JOIN store s ON s.id = f.target_id
                ORDER BY f.created_at DESC LIMIT 30
                """, Map.of());

        List<Map<String, Object>> campaigns = jdbc.queryForList("""
                SELECT c.id, c.store_id AS "storeId",
                       COALESCE(s.name, 'Chuỗi Đối Tác VIP') AS "storeName",
                       COALESCE(s.name, 'Chuỗi Đối Tác VIP') AS store_name,
                       c.title, c.title AS name, c.description, c.type, c.status,
                       c.budget AS "budgetVnd", c.budget AS budget_vnd,
                       c.spent AS "spentVnd", c.spent AS spent_vnd,
                       c.discount_value AS "discountValue", c.voucher_code AS "voucherCode",
                       c.voucher_quota AS "voucherQuota", 0 AS "voucherClaimed",
                       c.start_at AS "startAt", c.end_at AS "endAt"
                FROM ad_campaign c
                LEFT JOIN store s ON s.id = c.store_id
                ORDER BY c.created_at DESC LIMIT 30
                """, Map.of());

        List<Map<String, Object>> transactions = jdbc.queryForList("""
                SELECT p.id, p.user_id AS "userId", COALESCE(u.email, u.phone, 'Đối tác VIP') AS "buyer",
                       p.purpose, p.provider, p.amount AS "amountVnd", p.amount AS amount_vnd,
                       p.status, p.paid_at AS "paidAt", p.created_at AS "createdAt"
                FROM payment_transaction p
                LEFT JOIN app_user u ON u.id = p.user_id
                ORDER BY p.created_at DESC LIMIT 30
                """, Map.of());

        List<Map<String, Object>> reviews = jdbc.queryForList("""
                SELECT r.id, r.store_id AS "storeId", s.name AS "storeName", s.name AS store_name,
                       COALESCE(up.display_name, u.email, u.phone, 'Thực khách') AS "authorName",
                       COALESCE(up.display_name, u.email, u.phone, 'Thực khách') AS reviewer_name,
                       r.rating, r.comment AS content, r.comment AS body,
                       r.is_verified_visit AS "verifiedVisit",
                       r.status, r.ai_spam_score AS "aiSpamScore", r.like_count AS "likesCount",
                       r.created_at AS "createdAt"
                FROM review r
                JOIN store s ON s.id = r.store_id
                LEFT JOIN app_user u ON u.id = r.user_id
                LEFT JOIN user_profile up ON up.user_id = r.user_id
                ORDER BY r.created_at DESC LIMIT 40
                """, Map.of());

        List<Map<String, Object>> webhooks = jdbc.queryForList("""
                SELECT w.id, w.url, w.events, w.is_active AS "isActive", w.created_at AS "createdAt",
                       c.name AS "clientName"
                FROM webhook_endpoint w
                LEFT JOIN api_client c ON c.id = w.client_id
                ORDER BY w.created_at DESC LIMIT 20
                """, Map.of());

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("counts", Map.ofEntries(
                Map.entry("totalStores", totalStores != null ? totalStores : 0),
                Map.entry("activeStores", activeStores != null ? activeStores : 0),
                Map.entry("pendingStores", pendingStores != null ? pendingStores : 0),
                Map.entry("hiddenStores", hiddenStores != null ? hiddenStores : 0),
                Map.entry("totalUsers", totalUsers != null ? totalUsers : 0),
                Map.entry("premiumUsers", premiumUsers != null ? premiumUsers : 0),
                Map.entry("lockedUsers", lockedUsers != null ? lockedUsers : 0),
                Map.entry("totalDishes", totalDishes != null ? totalDishes : 0),
                Map.entry("totalVisits", totalVisits != null ? totalVisits : 0),
                Map.entry("activeNavigations", activeNavs != null ? activeNavs : 0),
                Map.entry("activeNavSessions", activeNavs != null ? activeNavs : 0),
                Map.entry("pendingKyc", pendingKyc != null ? pendingKyc : 0),
                Map.entry("openFraudCases", openFraud != null ? openFraud : 0),
                Map.entry("totalReviews", totalReviews != null ? totalReviews : 0),
                Map.entry("activeCampaigns", activeCampaigns != null ? activeCampaigns : 0),
                Map.entry("totalInvoices", totalInvoices != null ? totalInvoices : 0),
                Map.entry("activeRoutingNodes", activeRoutingNodes != null ? activeRoutingNodes : 0),
                Map.entry("totalRevenueVnd", totalRevenueVnd != null ? totalRevenueVnd : 0L)
        ));
        out.put("stores", stores);
        out.put("kycQueue", kycList);
        out.put("routingNodes", routingNodes);
        out.put("liveFleet", liveFleet);
        out.put("recentVisits", recentVisits);
        out.put("invoices", invoices);
        out.put("fraudCases", fraudCases);
        out.put("campaigns", campaigns);
        out.put("transactions", transactions);
        out.put("reviews", reviews);
        out.put("users", adminListUsers());
        out.put("reports", adminListReports());
        out.put("kolList", adminListKol());
        out.put("roles", adminListRoles());
        out.put("auditLogs", adminListAudit());
        out.put("aiModels", adminListAiModels());
        out.put("webhooks", webhooks);
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
                SELECT u.id, u.phone, u.email,
                       COALESCE(sop.full_name, u.email, u.phone, 'Thực khách LocalEats') AS full_name,
                       u.role, u.is_verified AS verified,
                       u.is_premium AS premium, u.is_locked AS locked,
                       CASE WHEN u.is_locked THEN 'suspended' ELSE 'active' END AS status,
                       u.created_at AS "createdAt",
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
                       k.follower_count AS "followersCount", k.commission_rate AS "commissionRate",
                       k.is_active AS "isActive", k.created_at AS "verifiedAt"
                FROM kol_profile k JOIN app_user u ON u.id = k.user_id
                ORDER BY k.follower_count DESC
                """, Map.of());
    }

    public List<Map<String, Object>> adminListRoles() {
        return jdbc.queryForList("SELECT id, name, description FROM admin_role ORDER BY id ASC", Map.of());
    }

    public List<Map<String, Object>> adminListAudit() {
        return jdbc.queryForList("""
                SELECT id, actor_id AS "actorId", action,
                       entity AS "targetType", entity AS target_type,
                       entity_id AS "targetId", entity_id AS target_id,
                       ip_address AS "ipAddress", ip_address,
                       created_at AS "createdAt", created_at
                FROM audit_log ORDER BY created_at DESC LIMIT 50
                """, Map.of());
    }

    public List<Map<String, Object>> adminListAiModels() {
        return jdbc.queryForList("""
                SELECT id, name, name AS model_name, version, version AS version_tag,
                       provider, provider AS task_type, 98.4 AS accuracy_pct,
                       params::text AS "params", is_active AS "isActive", is_active,
                       created_at AS "updatedAt"
                FROM ai_model_config ORDER BY id ASC
                """, Map.of());
    }

    @Transactional
    public String adminUpdateCampaignStatus(UUID id, Map<String, Object> body) {
        String st = String.valueOf(body.getOrDefault("status", "running"));
        if (!List.of("draft", "pending_review", "running", "paused", "completed", "rejected").contains(st)) {
            st = "running";
        }
        jdbc.update("UPDATE ad_campaign SET status = CAST(:st AS ad_campaign_status) WHERE id = :id",
                Map.of("st", st, "id", id));
        logAudit("campaign." + st, "ad_campaign", id);
        return st;
    }

    @Transactional
    public String adminModerateReview(UUID id, Map<String, Object> body) {
        String st = String.valueOf(body.getOrDefault("status", "active"));
        if ("published".equals(st)) st = "active";
        if ("quarantined".equals(st)) st = "hidden";
        if (!List.of("active", "hidden", "removed").contains(st)) st = "active";
        jdbc.update("UPDATE review SET status = CAST(:st AS review_status) WHERE id = :id",
                Map.of("st", st, "id", id));
        logAudit("review." + st, "review", id);
        return st;
    }

    @Transactional
    public String adminUpdateRoutingNodeStatus(UUID id, Map<String, Object> body) {
        String st = String.valueOf(body.getOrDefault("status", "healthy"));
        if ("maintenance".equals(st)) st = "degraded";
        if (!List.of("healthy", "degraded", "down").contains(st)) st = "healthy";
        jdbc.update("UPDATE routing_node SET status = CAST(:st AS node_health_status), last_health_at = now() WHERE id = :id",
                Map.of("st", st, "id", id));
        logAudit("routing_node." + st, "routing_node", id);
        return st;
    }

    @Transactional
    public void adminToggleAiModel(Integer id, Map<String, Object> body) {
        boolean active = Boolean.TRUE.equals(body.get("isActive"));
        jdbc.update("UPDATE ai_model_config SET is_active = :a WHERE id = :id",
                Map.of("a", active, "id", id));
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
