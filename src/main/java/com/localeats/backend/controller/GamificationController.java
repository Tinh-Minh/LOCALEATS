package com.localeats.backend.controller;

import com.localeats.backend.dto.ApiResponse;
import com.localeats.backend.entity.AppUser;
import com.localeats.backend.service.GamificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class GamificationController {

    private final GamificationService gamificationService;

    public GamificationController(GamificationService gamificationService) {
        this.gamificationService = gamificationService;
    }

    @PostMapping("/ai/recommend")
    public ResponseEntity<ApiResponse<Map<String, Object>>> aiRecommend(
            @AuthenticationPrincipal AppUser user,
            @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success(
                "AI Sommelier đã chọn lọc thực đơn tối ưu cho bạn",
                gamificationService.aiRecommend(user, body)));
    }

    @PostMapping("/ai/{id}/feedback")
    public ResponseEntity<ApiResponse<Object>> aiFeedback(
            @PathVariable String id,
            @RequestBody(required = false) Map<String, Object> body) {
        gamificationService.aiFeedback(id, body);
        return ResponseEntity.ok(ApiResponse.success("Cảm ơn phản hồi của bạn! AI Sommelier đã cập nhật sở thích khẩu vị.", null));
    }

    @GetMapping("/mystery/spin")
    public ResponseEntity<ApiResponse<Map<String, Object>>> mysterySpin(
            @AuthenticationPrincipal AppUser user,
            @RequestParam(required = false) String filter) {
        return ResponseEntity.ok(ApiResponse.success(
                "Mystery Box đã chọn được quán bất ngờ cho bạn!",
                gamificationService.mysterySpin(user, filter)));
    }

    @GetMapping("/challenges")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listChallenges() {
        return ResponseEntity.ok(ApiResponse.success("OK", gamificationService.listChallenges()));
    }

    @GetMapping("/challenges/me")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> myChallenges(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok(ApiResponse.success("OK", gamificationService.myChallenges(user)));
    }

    @GetMapping("/campaigns/active")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> activeCampaigns() {
        return ResponseEntity.ok(ApiResponse.success("OK", gamificationService.activeCampaigns()));
    }

    @PostMapping("/campaigns/{id}/claim")
    public ResponseEntity<ApiResponse<Map<String, Object>>> claimVoucher(
            @AuthenticationPrincipal AppUser user,
            @PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã lưu mã ưu đãi VIP!", gamificationService.claimVoucher(user, id)));
    }

    @PostMapping("/vouchers/{code}/redeem")
    public ResponseEntity<ApiResponse<Map<String, Object>>> redeemVoucher(
            @AuthenticationPrincipal AppUser user,
            @PathVariable String code) {
        return ResponseEntity.ok(ApiResponse.success(
                "Sử dụng mã ưu đãi VIP thành công!", gamificationService.redeemVoucher(user, code)));
    }

    @GetMapping("/lives")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listLives() {
        return ResponseEntity.ok(ApiResponse.success("OK", gamificationService.listLives()));
    }

    @PostMapping("/lives")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createLive(
            @AuthenticationPrincipal AppUser user,
            @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã bắt đầu phiên Livestream ẩm thực!", gamificationService.createLive(user, body)));
    }

    @PostMapping("/lives/{id}/like")
    public ResponseEntity<ApiResponse<Map<String, Object>>> likeLive(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("OK", gamificationService.likeLive(id)));
    }

    @PostMapping("/billing/premium/checkout")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkoutPremium(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã kích hoạt gói LocalEats Premium (25.000đ/tháng)!",
                gamificationService.checkoutPremium(user)));
    }

    @PostMapping("/billing/store-analytics/checkout")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkoutStoreAnalytics(
            @AuthenticationPrincipal AppUser user,
            @RequestBody(required = false) Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã kích hoạt Gói Thống Kê Nâng Cao 235.000đ/tháng cho cửa hàng!",
                gamificationService.checkoutStoreAnalytics(user, body)));
    }

    @PostMapping("/payments/webhook/{provider}")
    public ResponseEntity<ApiResponse<Object>> paymentWebhook(
            @PathVariable String provider,
            @RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(ApiResponse.success("Webhook " + provider + " processed", null));
    }

    @GetMapping("/billing/invoices")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listInvoices() {
        return ResponseEntity.ok(ApiResponse.success("OK", gamificationService.listInvoices()));
    }
}

