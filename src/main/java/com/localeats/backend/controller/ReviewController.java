package com.localeats.backend.controller;

import com.localeats.backend.dto.ApiResponse;
import com.localeats.backend.entity.AppUser;
import com.localeats.backend.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/reviews")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listReviews(
            @RequestParam(required = false) UUID storeId,
            @RequestParam(required = false) String filter) {
        return ResponseEntity.ok(ApiResponse.success("OK", reviewService.listReviews(storeId, filter)));
    }

    @PostMapping("/reviews")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createReview(
            @AuthenticationPrincipal AppUser user,
            @RequestBody Map<String, Object> body) {
        Map<String, Object> res = reviewService.createReview(user, body);
        boolean verifiedVisit = Boolean.TRUE.equals(res.get("verifiedVisit"));
        return ResponseEntity.ok(ApiResponse.success(
                verifiedVisit ? "Đã đăng đánh giá (Đã xác thực GPS tại quán!)" : "Đã đăng đánh giá thành công",
                res));
    }

    @PostMapping("/reviews/{id}/like")
    public ResponseEntity<ApiResponse<Map<String, Object>>> likeReview(
            @AuthenticationPrincipal AppUser user,
            @PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("OK", reviewService.likeReview(user, id)));
    }

    @PostMapping("/reports")
    public ResponseEntity<ApiResponse<Object>> createReport(
            @AuthenticationPrincipal AppUser user,
            @RequestBody Map<String, Object> body) {
        reviewService.createReport(user, body);
        return ResponseEntity.ok(ApiResponse.success("Đã gửi báo cáo, đội ngũ kiểm duyệt sẽ xử lý sớm nhất", null));
    }
}

