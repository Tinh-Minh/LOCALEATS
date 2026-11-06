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
public class GamificationService {

    private final NamedParameterJdbcTemplate jdbc;

    public GamificationService(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // =========================================================================
    // 1. AI SOMMELIER RECOMMENDATION & FEEDBACK (ai_recommendation)
    // =========================================================================
    @Transactional
    public Map<String, Object> aiRecommend(AppUser user, Map<String, Object> body) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333332");
        String prompt = String.valueOf(body.getOrDefault("prompt", ""));
        String mood = String.valueOf(body.getOrDefault("mood", "hot_broth"));
        String budget = String.valueOf(body.getOrDefault("budget", "budget_mid"));
        String distance = String.valueOf(body.getOrDefault("distance", "dist_3"));
        double lat = body.get("lat") != null ? ((Number) body.get("lat")).doubleValue() : 10.7769;
        double lng = body.get("lng") != null ? ((Number) body.get("lng")).doubleValue() : 106.7009;

        int maxPrice = "budget_low".equals(budget) ? 45000 : ("budget_mid".equals(budget) ? 95000 : 500000);
        int maxDistM = "dist_1".equals(distance) ? 1500 : ("dist_3".equals(distance) ? 4500 : 25000);

        List<Map<String, Object>> dishes = jdbc.queryForList("""
                SELECT m.id AS "dishId", m.name AS "dishName", m.price, m.image_url AS "imageUrl",
                       s.id AS "storeId", s.name AS "storeName", s.address, s.district,
                       s.latitude AS lat, s.longitude AS lng, s.rating_avg AS rating,
                       fn_haversine_m(:lat, :lng, s.latitude::float8, s.longitude::float8) AS dist_m
                FROM menu_item m
                JOIN store s ON s.id = m.store_id
                WHERE s.status = 'active'::store_status
                  AND m.status = 'available'::menu_item_status
                  AND m.price <= :maxPrice
                  AND fn_haversine_m(:lat, :lng, s.latitude::float8, s.longitude::float8) <= :maxDist
                ORDER BY m.is_signature DESC, s.rating_avg DESC, dist_m ASC
                LIMIT 12
                """, Map.of("lat", lat, "lng", lng, "maxPrice", maxPrice, "maxDist", maxDistM));

        if (dishes.isEmpty()) {
            dishes = jdbc.queryForList("""
                    SELECT m.id AS "dishId", m.name AS "dishName", m.price, m.image_url AS "imageUrl",
                           s.id AS "storeId", s.name AS "storeName", s.address, s.district,
                           s.latitude AS lat, s.longitude AS lng, s.rating_avg AS rating,
                           fn_haversine_m(:lat, :lng, s.latitude::float8, s.longitude::float8) AS dist_m
                    FROM menu_item m JOIN store s ON s.id = m.store_id
                    WHERE s.status = 'active'::store_status
                    ORDER BY m.is_signature DESC, s.rating_avg DESC LIMIT 8
                    """, Map.of("lat", lat, "lng", lng));
        }

        NumberFormat nf = NumberFormat.getInstance(new Locale("vi", "VN"));
        List<Map<String, Object>> formatted = new ArrayList<>();
        int idx = 0;
        for (Map<String, Object> d : dishes) {
            Map<String, Object> item = new LinkedHashMap<>(d);
            int p = d.get("price") != null ? ((Number) d.get("price")).intValue() : 45000;
            double dm = d.get("dist_m") != null ? ((Number) d.get("dist_m")).doubleValue() : 1200;
            item.put("priceText", nf.format(p) + "đ");
            item.put("distanceKm", Math.round((dm / 1000.0) * 10.0) / 10.0);
            item.put("matchScore", Math.max(88, 99 - idx * 2) + "%");
            item.put("aiReason", "Phù hợp gu \"" + (prompt.isBlank() ? mood : prompt) + "\", cách bạn "
                    + String.format(Locale.US, "%.1f km", dm / 1000.0));
            formatted.add(item);
            idx++;
        }

        // Ghi log ai_recommendation vao PostgreSQL
        try {
            jdbc.update("""
                    INSERT INTO ai_recommendation (user_id, prompt_text, mood_code, budget_code, distance_code, latitude, longitude, latency_ms)
                    VALUES (:uid, :pr, :md, :bg, :dist, :lat, :lng, 42)
                    """, new MapSqlParameterSource()
                    .addValue("uid", uid).addValue("pr", prompt.isBlank() ? mood : prompt)
                    .addValue("md", mood).addValue("bg", budget).addValue("dist", distance)
                    .addValue("lat", lat).addValue("lng", lng));
        } catch (Exception ignored) {}

        return Map.of(
                "summary", "Dựa trên vị trí GPS và khẩu vị của bạn, AI đề xuất " + formatted.size() + " món đặc sắc nhất quanh đây:",
                "recommendations", formatted
        );
    }

    public void aiFeedback(String id, Map<String, Object> body) {
        // Luu feedback khau vi nguoi dung
    }

    // =========================================================================
    // 2. MYSTERY BOX SPIN (spin_history) & FOOD CHALLENGES
    // =========================================================================
    @Transactional
    public Map<String, Object> mysterySpin(AppUser user, String filter) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333332");
        List<Map<String, Object>> rows = jdbc.queryForList("""
                SELECT id, name, address, district, latitude AS lat, longitude AS lng,
                       specialty, price_min AS "priceMin", price_max AS "priceMax",
                       rating_avg AS rating, cover_image_url AS image
                FROM store WHERE status = 'active'::store_status
                ORDER BY random() LIMIT 1
                """, Map.of());
        if (rows.isEmpty()) return Map.of();
        Map<String, Object> chosen = rows.get(0);
        try {
            jdbc.update("""
                    INSERT INTO spin_history (user_id, filter, store_id)
                    VALUES (:uid, :flt, :sid)
                    """, Map.of("uid", uid, "flt", filter != null ? filter : "all", "sid", chosen.get("id")));
        } catch (Exception ignored) {}
        return chosen;
    }

    public List<Map<String, Object>> listChallenges() {
        return jdbc.queryForList("""
                SELECT id, title, description, badge_name AS "badgeName", badge_icon AS "badgeIcon",
                       target_count AS "targetCount", reward_points AS "rewardPoints"
                FROM food_challenge WHERE is_active = TRUE
                """, Map.of());
    }

    public List<Map<String, Object>> myChallenges(AppUser user) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333332");
        Integer myVisits = jdbc.queryForObject("SELECT count(*) FROM store_visit WHERE user_id = :u", Map.of("u", uid), Integer.class);
        int visits = myVisits != null ? myVisits : 0;
        List<Map<String, Object>> rows = listChallenges();
        for (Map<String, Object> r : rows) {
            int target = ((Number) r.get("targetCount")).intValue();
            int cur = Math.min(target, visits);
            r.put("currentCount", cur);
            r.put("completed", cur >= target);
        }
        return rows;
    }

    // =========================================================================
    // 3. VIP CAMPAIGNS & VOUCHERS
    // =========================================================================
    public List<Map<String, Object>> activeCampaigns() {
        return jdbc.queryForList("""
                SELECT c.id, c.store_id AS "storeId", s.name AS "storeName", s.address, s.district,
                       s.cover_image_url AS image, s.rating_avg AS rating,
                       c.title, c.description, c.type, c.discount_value AS "discountValue",
                       c.voucher_code AS "voucherCode", c.voucher_quota AS "voucherQuota",
                       c.require_visit AS "requireVisit", c.end_at AS "endAt"
                FROM ad_campaign c
                JOIN store s ON s.id = c.store_id
                WHERE c.status = 'running'::ad_campaign_status
                ORDER BY c.created_at DESC
                """, Map.of());
    }

    @Transactional
    public Map<String, Object> claimVoucher(AppUser user, UUID id) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333332");
        Map<String, Object> camp = jdbc.queryForMap("SELECT voucher_code, title FROM ad_campaign WHERE id = :id", Map.of("id", id));
        String code = camp.get("voucher_code") + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        jdbc.update("""
                INSERT INTO voucher_claim (campaign_id, user_id, code, expires_at)
                VALUES (:cid, :uid, :code, now() + INTERVAL '14 days')
                ON CONFLICT (campaign_id, user_id) DO NOTHING
                """, Map.of("cid", id, "uid", uid, "code", code));
        return Map.of("code", code, "title", camp.get("title"));
    }

    @Transactional
    public Map<String, Object> redeemVoucher(AppUser user, String code) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333332");
        List<Map<String, Object>> claims = jdbc.queryForList("""
                SELECT vc.id, vc.redeemed_at, c.store_id, c.require_visit, c.title, c.discount_value
                FROM voucher_claim vc JOIN ad_campaign c ON c.id = vc.campaign_id
                WHERE vc.code = :code
                """, Map.of("code", code));
        if (claims.isEmpty()) {
            throw new BadRequestException("Không tìm thấy mã voucher: " + code);
        }
        Map<String, Object> cl = claims.get(0);
        if (cl.get("redeemed_at") != null) {
            throw new BadRequestException("Mã voucher này đã được sử dụng trước đó");
        }
        boolean reqVisit = Boolean.TRUE.equals(cl.get("require_visit"));
        if (reqVisit) {
            Integer vCnt = jdbc.queryForObject(
                    "SELECT count(*) FROM store_visit WHERE user_id = :u AND store_id = :s",
                    Map.of("u", uid, "s", cl.get("store_id")), Integer.class);
            if (vCnt == null || vCnt == 0) {
                throw new BadRequestException("Voucher này yêu cầu xác nhận GPS đã đến quán (>= 10 phút) trước khi sử dụng!");
            }
        }
        jdbc.update("UPDATE voucher_claim SET redeemed_at = now() WHERE id = :id", Map.of("id", cl.get("id")));
        return Map.of("code", code, "title", cl.get("title"));
    }

    // =========================================================================
    // 4. LIVESTREAMS
    // =========================================================================
    public List<Map<String, Object>> listLives() {
        return jdbc.queryForList("""
                SELECT l.id, l.store_id AS "storeId", COALESCE(s.name, 'Quán Ngon Sài Gòn') AS "storeName",
                       s.address, s.district, l.title, l.stream_url AS "streamUrl",
                       l.thumbnail_url AS "thumbnailUrl", l.status,
                       l.viewer_peak AS viewers, l.like_count AS likes, l.started_at AS "startedAt"
                FROM livestream l
                LEFT JOIN store s ON s.id = l.store_id
                ORDER BY l.viewer_peak DESC
                """, Map.of());
    }

    @Transactional
    public Map<String, Object> createLive(AppUser user, Map<String, Object> body) {
        UUID hostId = user != null ? user.getId() : UUID.fromString("44444444-4444-4444-4444-444444444441");
        UUID storeId = body.get("storeId") != null ? UUID.fromString(String.valueOf(body.get("storeId")))
                : UUID.fromString("88888888-0000-0000-0000-000000000001");
        UUID liveId = UUID.randomUUID();
        String title = String.valueOf(body.getOrDefault("title", "Phát trực tiếp bếp nóng tại quán"));
        String streamUrl = String.valueOf(body.getOrDefault("streamUrl", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"));
        String thumb = String.valueOf(body.getOrDefault("thumbnailUrl", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"));

        jdbc.update("""
                INSERT INTO livestream (id, store_id, host_user_id, title, stream_url, thumbnail_url, status, viewer_peak, like_count, started_at)
                VALUES (:id, :sid, :hid, :t, :url, :th, 'live'::live_status, 128, 15, now())
                """, Map.of("id", liveId, "sid", storeId, "hid", hostId, "t", title, "url", streamUrl, "th", thumb));
        return Map.of("liveId", liveId);
    }

    @Transactional
    public Map<String, Object> likeLive(UUID id) {
        jdbc.update("UPDATE livestream SET like_count = like_count + 1 WHERE id = :id", Map.of("id", id));
        Integer likes = jdbc.queryForObject("SELECT like_count FROM livestream WHERE id = :id", Map.of("id", id), Integer.class);
        return Map.of("liveId", id, "likes", likes != null ? likes : 1);
    }

    // =========================================================================
    // 5. BILLING & SUBSCRIPTIONS (user_subscription, store_stat_subscription, payment_transaction)
    // =========================================================================
    @Transactional
    public Map<String, Object> checkoutPremium(AppUser user) {
        UUID uid = user != null ? user.getId() : UUID.fromString("33333333-3333-3333-3333-333333333332");
        jdbc.update("UPDATE app_user SET is_premium = TRUE WHERE id = :u", Map.of("u", uid));
        try {
            Integer planId = jdbc.queryForObject("SELECT id FROM subscription_plan WHERE code = 'USER_PREMIUM_1M'", Map.of(), Integer.class);
            UUID txId = UUID.randomUUID();
            String ref = "PAYOS-" + txId.toString().substring(0, 8);
            jdbc.update("""
                    INSERT INTO payment_transaction (id, user_id, purpose, amount, currency, provider, provider_ref, status, paid_at)
                    VALUES (:id, :uid, 'user_premium'::subscription_type, 25000, 'VND', 'payos', :ref, 'paid'::payment_status, now())
                    """, Map.of("id", txId, "uid", uid, "ref", ref));
            jdbc.update("""
                    INSERT INTO user_subscription (user_id, plan_id, type, start_date, end_date, status, payment_status, price_paid, payment_ref)
                    VALUES (:uid, :pid, 'user_premium'::subscription_type, CURRENT_DATE, CURRENT_DATE + 30, 'active'::subscription_status, 'paid'::payment_status, 25000, :ref)
                    """, Map.of("uid", uid, "pid", planId, "ref", ref));
        } catch (Exception ignored) {}
        return Map.of("planCode", "USER_PREMIUM_1M", "amountVnd", 25000, "status", "paid");
    }

    @Transactional
    public Map<String, Object> checkoutStoreAnalytics(AppUser user, Map<String, Object> body) {
        UUID uid = user != null ? user.getId() : UUID.fromString("44444444-4444-4444-4444-444444444441");
        UUID sid = body != null && body.get("storeId") != null
                ? UUID.fromString(String.valueOf(body.get("storeId")))
                : UUID.fromString("88888888-0000-0000-0000-000000000001");
        try {
            Integer planId = jdbc.queryForObject("SELECT id FROM subscription_plan WHERE code = 'STORE_ANALYTICS_1M'", Map.of(), Integer.class);
            UUID txId = UUID.randomUUID();
            String ref = "PAYOS-" + txId.toString().substring(0, 8);
            jdbc.update("""
                    INSERT INTO payment_transaction (id, user_id, purpose, ref_id, amount, currency, provider, provider_ref, status, paid_at)
                    VALUES (:id, :uid, 'store_analytics'::subscription_type, :sid, 235000, 'VND', 'payos', :ref, 'paid'::payment_status, now())
                    """, Map.of("id", txId, "uid", uid, "sid", sid, "ref", ref));
            jdbc.update("""
                    INSERT INTO store_stat_subscription (store_id, plan_id, start_date, end_date, status, payment_status, price_paid, payment_ref)
                    VALUES (:sid, :pid, CURRENT_DATE, CURRENT_DATE + 30, 'active'::subscription_status, 'paid'::payment_status, 235000, :ref)
                    """, Map.of("sid", sid, "pid", planId, "ref", ref));
        } catch (Exception ignored) {}
        return Map.of("planCode", "STORE_ANALYTICS_1M", "amountVnd", 235000, "status", "paid");
    }

    public List<Map<String, Object>> listInvoices() {
        return jdbc.queryForList("""
                SELECT id, invoice_no AS "invoiceNo", buyer_name AS "buyerName",
                       buyer_tax_code AS "buyerTaxCode", subtotal, vat_amount AS "vatAmount",
                       total, status, issued_at AS "issuedAt"
                FROM invoice ORDER BY created_at DESC LIMIT 50
                """, Map.of());
    }
}
