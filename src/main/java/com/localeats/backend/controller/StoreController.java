package com.localeats.backend.controller;

import com.localeats.backend.dto.ApiResponse;
import com.localeats.backend.entity.AppUser;
import com.localeats.backend.service.MenuService;
import com.localeats.backend.service.StoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class StoreController {

    private final StoreService storeService;
    private final MenuService menuService;

    public StoreController(StoreService storeService, MenuService menuService) {
        this.storeService = storeService;
        this.menuService = menuService;
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listCategories() {
        return ResponseEntity.ok(ApiResponse.success("OK", storeService.listCategories()));
    }

    @GetMapping("/stores")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listStores(
            @AuthenticationPrincipal AppUser user,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lng,
            @RequestParam(required = false) Integer radiusMeters,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "250") int limit) {
        return ResponseEntity.ok(ApiResponse.success("OK",
                storeService.listStores(user, lat, lng, radiusMeters, q, district, category, limit)));
    }

    @GetMapping("/stores/hot")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> hotStores(
            @RequestParam(required = false, defaultValue = "week") String range,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lng) {
        return ResponseEntity.ok(ApiResponse.success("OK", storeService.hotStores(range, district, lat, lng)));
    }

    @GetMapping("/stores/{id}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStoreDetail(
            @AuthenticationPrincipal AppUser user,
            @PathVariable UUID id,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lng) {
        return ResponseEntity.ok(ApiResponse.success("OK", storeService.getStoreDetail(user, id, lat, lng)));
    }

    @GetMapping("/stores/{id}/menu")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getStoreMenu(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("OK", menuService.getStoreMenu(id, true)));
    }

    @PostMapping("/stores/{id}/vote")
    public ResponseEntity<ApiResponse<Map<String, Object>>> voteStore(
            @AuthenticationPrincipal AppUser user,
            @PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã bình chọn quán yêu thích!", storeService.voteStore(user, id)));
    }

    @GetMapping("/saved/stores")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getSavedStores(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok(ApiResponse.success("OK", storeService.getSavedStores(user)));
    }

    @PostMapping("/stores/{id}/save")
    public ResponseEntity<ApiResponse<Object>> saveStore(@AuthenticationPrincipal AppUser user, @PathVariable UUID id) {
        storeService.saveStore(user, id);
        return ResponseEntity.ok(ApiResponse.success("Đã lưu vào bộ sưu tập yêu thích", null));
    }

    @DeleteMapping("/stores/{id}/save")
    public ResponseEntity<ApiResponse<Object>> unsaveStore(@AuthenticationPrincipal AppUser user, @PathVariable UUID id) {
        storeService.unsaveStore(user, id);
        return ResponseEntity.ok(ApiResponse.success("Đã bỏ lưu quán", null));
    }
}
