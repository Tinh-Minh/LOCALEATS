package com.localeats.backend.service;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class MenuService {

    private final NamedParameterJdbcTemplate jdbc;

    public MenuService(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> getStoreMenu(UUID storeId, boolean includeHidden) {
        if (includeHidden) {
            return jdbc.queryForList("""
                    SELECT m.id, m.name, m.description, m.price, m.discount_price AS "discountPrice",
                           m.image_url AS "imageUrl", m.status, m.is_signature AS "isSignature",
                           m.order_count AS "orderCount", COALESCE(mc.name, 'Thực đơn') AS "categoryName"
                    FROM menu_item m
                    LEFT JOIN menu_category mc ON mc.id = m.menu_category_id
                    WHERE m.store_id = :sid
                    ORDER BY m.is_signature DESC, m.order_count DESC, m.created_at DESC
                    """, Map.of("sid", storeId));
        }
        return jdbc.queryForList("""
                SELECT m.id, m.name, m.description, m.price, m.discount_price AS "discountPrice",
                       m.image_url AS "imageUrl", m.status, m.is_signature AS "isSignature",
                       m.order_count AS "orderCount", mc.name AS "categoryName"
                FROM menu_item m
                LEFT JOIN menu_category mc ON mc.id = m.menu_category_id
                WHERE m.store_id = :sid AND m.status <> 'hidden'::menu_item_status
                ORDER BY m.is_signature DESC, m.order_count DESC, m.name ASC
                """, Map.of("sid", storeId));
    }

    @Transactional
    public Map<String, Object> createMenuItem(Map<String, Object> body) {
        UUID sid = body.get("storeId") != null ? UUID.fromString(String.valueOf(body.get("storeId")))
                : UUID.fromString("88888888-0000-0000-0000-000000000001");
        UUID itemId = UUID.randomUUID();
        String name = String.valueOf(body.getOrDefault("name", "Món mới"));
        String desc = String.valueOf(body.getOrDefault("description", ""));
        int price = body.get("price") != null ? ((Number) body.get("price")).intValue() : 45000;
        String img = String.valueOf(body.getOrDefault("imageUrl", "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80"));
        boolean sig = Boolean.TRUE.equals(body.get("isSignature"));

        jdbc.update("""
                INSERT INTO menu_item (id, store_id, name, description, price, image_url, status, is_signature)
                VALUES (:id, :sid, :n, :d, :p, :img, 'available'::menu_item_status, :sig)
                """, new MapSqlParameterSource()
                .addValue("id", itemId)
                .addValue("sid", sid)
                .addValue("n", name)
                .addValue("d", desc)
                .addValue("p", Math.max(0, price))
                .addValue("img", img)
                .addValue("sig", sig));

        return Map.of("id", itemId);
    }

    @Transactional
    public void toggleMenuItemStatus(UUID id, Map<String, Object> body) {
        String st = String.valueOf(body.getOrDefault("status", "available"));
        if (!List.of("available", "sold_out", "hidden").contains(st)) st = "available";
        jdbc.update("UPDATE menu_item SET status = CAST(:st AS menu_item_status) WHERE id = :id",
                Map.of("st", st, "id", id));
    }

    @Transactional
    public void deleteMenuItem(UUID id) {
        jdbc.update("DELETE FROM menu_item WHERE id = :id", Map.of("id", id));
    }
}

