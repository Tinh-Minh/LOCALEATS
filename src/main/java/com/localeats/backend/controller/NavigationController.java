package com.localeats.backend.controller;

import com.localeats.backend.dto.ApiResponse;
import com.localeats.backend.entity.AppUser;
import com.localeats.backend.service.NavigationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class NavigationController {

    private final NavigationService navigationService;

    public NavigationController(NavigationService navigationService) {
        this.navigationService = navigationService;
    }

    /** Tinh duong nhanh khong tao phien */
    @GetMapping("/route")
    public ResponseEntity<ApiResponse<Map<String, Object>>> computeRouteGet(
            @RequestParam double originLat,
            @RequestParam double originLng,
            @RequestParam double destLat,
            @RequestParam double destLng,
            @RequestParam(defaultValue = "bike") String mode) {
        Map<String, Object> route = navigationService.computeRoute(originLat, originLng, destLat, destLng, mode);
        return ResponseEntity.ok(ApiResponse.success("OK", route));
    }

    @PostMapping("/route")
    public ResponseEntity<ApiResponse<Map<String, Object>>> computeRoutePost(@RequestBody Map<String, Object> body) {
        double originLat = ((Number) body.get("originLat")).doubleValue();
        double originLng = ((Number) body.get("originLng")).doubleValue();
        double destLat = ((Number) body.get("destLat")).doubleValue();
        double destLng = ((Number) body.get("destLng")).doubleValue();
        String mode = String.valueOf(body.getOrDefault("mode", "bike"));
        Map<String, Object> route = navigationService.computeRoute(originLat, originLng, destLat, destLng, mode);
        return ResponseEntity.ok(ApiResponse.success("OK", route));
    }

    /** Lay phien chi duong GPS dang hoat dong cua nguoi dung */
    @GetMapping("/navigation/sessions/active")
    public ResponseEntity<ApiResponse<Map<String, Object>>> activeSession(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok(ApiResponse.success("OK", navigationService.getActiveSession(user)));
    }

    /** Bat dau phien chi duong & theo doi GPS khi user nhap vao quan */
    @PostMapping("/navigation/sessions")
    public ResponseEntity<ApiResponse<Map<String, Object>>> startSession(
            @AuthenticationPrincipal AppUser user,
            @RequestBody Map<String, Object> body) {
        UUID storeId = UUID.fromString(String.valueOf(body.get("storeId")));
        String mode = String.valueOf(body.getOrDefault("mode", "bike"));
        double originLat = ((Number) body.get("originLat")).doubleValue();
        double originLng = ((Number) body.get("originLng")).doubleValue();
        Double accuracy = body.get("accuracy") != null ? ((Number) body.get("accuracy")).doubleValue() : 15.0;

        Map<String, Object> session = navigationService.startSession(user, storeId, mode, originLat, originLng, accuracy);
        return ResponseEntity.ok(ApiResponse.success("Đã bắt đầu phiên định vị & chỉ đường GPS", session));
    }

    /** Nhan ping GPS tu thiet bi: phat hien di chuyen (moving) va dung yen >= 10 phut (arrived) */
    @PostMapping("/navigation/sessions/{id}/pings")
    public ResponseEntity<ApiResponse<Map<String, Object>>> sendPing(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> body) {
        double lat = ((Number) body.get("latitude")).doubleValue();
        double lng = ((Number) body.get("longitude")).doubleValue();
        Double accuracy = body.get("accuracy") != null ? ((Number) body.get("accuracy")).doubleValue() : 12.0;
        Double speed = body.get("speed") != null ? ((Number) body.get("speed")).doubleValue() : null;
        Boolean isMock = body.get("isMock") != null ? Boolean.valueOf(String.valueOf(body.get("isMock"))) : false;
        Integer simSec = body.get("simulatedElapsedSeconds") != null ? ((Number) body.get("simulatedElapsedSeconds")).intValue() : null;

        Map<String, Object> res = navigationService.processPing(id, lat, lng, accuracy, speed, isMock, simSec);
        return ResponseEntity.ok(ApiResponse.success("OK", res));
    }

    @PostMapping("/navigation/sessions/{id}/cancel")
    public ResponseEntity<ApiResponse<Object>> cancelSession(@PathVariable UUID id) {
        navigationService.cancelSession(id);
        return ResponseEntity.ok(ApiResponse.success("Đã kết thúc phiên chỉ đường", null));
    }

    @GetMapping("/visits/me")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> myVisits(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok(ApiResponse.success("OK", navigationService.getMyVisits(user)));
    }
}
