package com.localeats.backend.controller;

import com.localeats.backend.dto.ApiResponse;
import com.localeats.backend.entity.AppUser;
import com.localeats.backend.service.TripService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/trips")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> listTrips(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok(ApiResponse.success("OK", tripService.listTrips(user)));
    }

    @PostMapping("/trips")
    public ResponseEntity<ApiResponse<Map<String, Object>>> saveTrip(
            @AuthenticationPrincipal AppUser user,
            @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã lưu lộ trình Food Tour vào Bộ Sưu Tập!", tripService.saveTrip(user, body)));
    }

    @PostMapping("/trips/optimize")
    public ResponseEntity<ApiResponse<Map<String, Object>>> optimizeTrip(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã tối ưu hóa thứ tự điểm dừng bằng thuật toán Nearest-Neighbor + 2-Opt!",
                tripService.optimizeTrip(body)));
    }

    @PostMapping("/trips/{id}/start")
    public ResponseEntity<ApiResponse<Map<String, Object>>> startTrip(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(
                "Đã bắt đầu hành trình Food Tour! Hệ thống sẽ tự động đánh dấu hoàn thành từng điểm khi bạn dừng GPS tại quán >= 10 phút.",
                tripService.startTrip(id)));
    }

    @DeleteMapping("/trips/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteTrip(@PathVariable UUID id) {
        tripService.deleteTrip(id);
        return ResponseEntity.ok(ApiResponse.success("Đã xóa lịch trình", null));
    }
}

