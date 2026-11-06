package com.localeats.backend.controller;

import com.localeats.backend.dto.ApiResponse;
import com.localeats.backend.service.AdminPortalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class AdminPortalController {

    private final AdminPortalService adminPortalService;

    public AdminPortalController(AdminPortalService adminPortalService) {
        this.adminPortalService = adminPortalService;
    }

    @GetMapping("/admin/overview")
    public ResponseEntity<ApiResponse<Map<String, Object>>> adminOverview() {
        return ResponseEntity.ok(ApiResponse.success("OK", adminPortalService.adminOverview()));
    }

    @PostMapping("/admin/stores")
    public ResponseEntity<ApiResponse<Map<String, Object>>> adminCreateStore(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã tạo và kích hoạt quán mới trên bản đồ!", adminPortalService.adminCreateStore(body)));
    }

    @PatchMapping("/admin/stores/{id}/status")
    public ResponseEntity<ApiResponse<Object>> adminUpdateStoreStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        String st = adminPortalService.adminUpdateStoreStatus(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật trạng thái quán thành " + st, null));
    }

    @GetMapping("/admin/users")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> adminListUsers() {
        return ResponseEntity.ok(ApiResponse.success("OK", adminPortalService.adminListUsers()));
    }

    @PatchMapping("/admin/users/{id}/lock")
    public ResponseEntity<ApiResponse<Object>> adminToggleUserLock(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        boolean locked = adminPortalService.adminToggleUserLock(id, body);
        return ResponseEntity.ok(ApiResponse.success(locked ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản", null));
    }

    @PatchMapping("/admin/kyc/{id}")
    public ResponseEntity<ApiResponse<Object>> adminReviewKyc(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        String st = adminPortalService.adminReviewKyc(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật trạng thái hồ sơ KYC: " + st, null));
    }

    @GetMapping("/admin/reports")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> adminListReports() {
        return ResponseEntity.ok(ApiResponse.success("OK", adminPortalService.adminListReports()));
    }

    @PatchMapping("/admin/reports/{id}")
    public ResponseEntity<ApiResponse<Object>> adminResolveReport(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        adminPortalService.adminResolveReport(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã xử lý báo cáo vi phạm", null));
    }

    @PatchMapping("/admin/fraud/{id}")
    public ResponseEntity<ApiResponse<Object>> adminUpdateFraudCase(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        adminPortalService.adminUpdateFraudCase(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật hồ sơ chống gian lận", null));
    }

    @GetMapping("/admin/kol")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> adminListKol() {
        return ResponseEntity.ok(ApiResponse.success("OK", adminPortalService.adminListKol()));
    }

    @GetMapping("/admin/roles")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> adminListRoles() {
        return ResponseEntity.ok(ApiResponse.success("OK", adminPortalService.adminListRoles()));
    }

    @GetMapping("/admin/audit")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> adminListAudit() {
        return ResponseEntity.ok(ApiResponse.success("OK", adminPortalService.adminListAudit()));
    }

    @GetMapping("/admin/ai/models")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> adminListAiModels() {
        return ResponseEntity.ok(ApiResponse.success("OK", adminPortalService.adminListAiModels()));
    }

    @PatchMapping("/admin/campaigns/{id}/status")
    public ResponseEntity<ApiResponse<Object>> adminUpdateCampaignStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        String st = adminPortalService.adminUpdateCampaignStatus(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật chiến dịch quảng cáo: " + st, null));
    }

    @PatchMapping("/admin/reviews/{id}/status")
    public ResponseEntity<ApiResponse<Object>> adminModerateReview(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        String st = adminPortalService.adminModerateReview(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật trạng thái đánh giá: " + st, null));
    }

    @PatchMapping("/admin/routing-nodes/{id}")
    public ResponseEntity<ApiResponse<Object>> adminUpdateRoutingNodeStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        String st = adminPortalService.adminUpdateRoutingNodeStatus(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật trạng thái cụm node định tuyến: " + st, null));
    }

    @PatchMapping("/admin/ai/models/{id}")
    public ResponseEntity<ApiResponse<Object>> adminToggleAiModel(
            @PathVariable Integer id,
            @RequestBody Map<String, Object> body) {
        adminPortalService.adminToggleAiModel(id, body);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật cấu hình AI Model", null));
    }
}

