package com.localeats.backend.controller;

import com.localeats.backend.dto.ApiResponse;
import com.localeats.backend.service.MenuService;
import com.localeats.backend.service.MerchantService;
import com.localeats.backend.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class MerchantController {

    private final MerchantService merchantService;
    private final MenuService menuService;
    private final ReviewService reviewService;

    public MerchantController(MerchantService merchantService,
                              MenuService menuService,
                              ReviewService reviewService) {
        this.merchantService = merchantService;
        this.menuService = menuService;
        this.reviewService = reviewService;
    }

    @GetMapping("/merchant/overview")
    public ResponseEntity<ApiResponse<Map<String, Object>>> merchantOverview(
            @RequestParam(required = false) UUID storeId) {
        return ResponseEntity.ok(ApiResponse.success("OK", merchantService.merchantOverview(storeId)));
    }

    @PostMapping("/merchant/menu")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createMenuItem(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã thêm món ăn mới vào thực đơn!", menuService.createMenuItem(body)));
    }

    @PatchMapping("/merchant/menu/{id}/status")
    public ResponseEntity<ApiResponse<Object>> toggleMenuItemStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        menuService.toggleMenuItemStatus(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật trạng thái món ăn", null));
    }

    @DeleteMapping("/merchant/menu/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteMenuItem(@PathVariable UUID id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.ok(ApiResponse.success("Đã xóa món ăn khỏi thực đơn", null));
    }

    @PostMapping("/merchant/reviews/{id}/reply")
    public ResponseEntity<ApiResponse<Object>> replyReview(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        reviewService.replyReview(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã gửi phản hồi của Chủ quán", null));
    }

    @PutMapping("/merchant/stores/{id}")
    public ResponseEntity<ApiResponse<Object>> merchantUpdateStore(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        merchantService.updateStore(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật thông tin cửa hàng thành công!", null));
    }

    @PostMapping("/merchant/campaigns")
    public ResponseEntity<ApiResponse<Map<String, Object>>> merchantCreateCampaign(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã khởi tạo chiến dịch quảng cáo VIP!", merchantService.createCampaign(body)));
    }

    @PostMapping("/merchant/kyc")
    public ResponseEntity<ApiResponse<Map<String, Object>>> merchantSubmitKyc(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã gửi hồ sơ KYC & Giấy phép ATTP chờ duyệt!", merchantService.submitKyc(body)));
    }
}

