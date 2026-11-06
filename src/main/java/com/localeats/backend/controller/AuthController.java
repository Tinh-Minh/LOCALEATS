package com.localeats.backend.controller;

import com.localeats.backend.dto.*;
import com.localeats.backend.entity.AppUser;
import com.localeats.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Map<String, Object>>> register(@Valid @RequestBody RegisterRequest request) {
        Map<String, Object> data = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(
                "Đăng ký thành công, vui lòng kiểm tra mã OTP trên Email hoặc Zalo để xác thực", data));
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse<Object>> resendOtp(@Valid @RequestBody ResendOtpRequest request) {
        authService.resendOtp(request);
        return ResponseEntity.ok(ApiResponse.success("Đã gửi lại mã OTP", null));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<AuthResponse>> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request,
            HttpServletRequest httpReq) {
        AuthResponse result = authService.verifyOtp(request, httpReq.getHeader("User-Agent"), httpReq.getRemoteAddr());
        return ResponseEntity.ok(ApiResponse.success("Xác thực OTP thành công", result));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpReq) {
        AuthResponse result = authService.login(request, httpReq.getHeader("User-Agent"), httpReq.getRemoteAddr());
        return ResponseEntity.ok(ApiResponse.success("Đăng nhập thành công", result));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(
            @Valid @RequestBody RefreshTokenRequest request,
            HttpServletRequest httpReq) {
        AuthResponse result = authService.refresh(request, httpReq.getHeader("User-Agent"), httpReq.getRemoteAddr());
        return ResponseEntity.ok(ApiResponse.success("Làm mới phiên thành công", result));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Object>> logout(@RequestBody(required = false) Map<String, String> body) {
        String rt = body != null ? body.get("refreshToken") : null;
        authService.logout(rt);
        return ResponseEntity.ok(ApiResponse.success("Đã đăng xuất", null));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Map<String, Object>>> forgotPassword(@RequestBody Map<String, String> body) {
        Map<String, Object> res = authService.forgotPassword(
                body.get("identifier"),
                body.get("verificationChannel")
        );
        return ResponseEntity.ok(ApiResponse.success("Đã gửi mã OTP khôi phục mật khẩu", res));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Object>> resetPassword(@RequestBody Map<String, String> body) {
        authService.resetPassword(body.get("identifier"), body.get("otp"), body.get("newPassword"));
        return ResponseEntity.ok(ApiResponse.success("Đặt lại mật khẩu thành công, bạn có thể đăng nhập ngay", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Map<String, Object>>> me(@AuthenticationPrincipal AppUser user) {
        if (user == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Chưa đăng nhập"));
        }
        return ResponseEntity.ok(ApiResponse.success("OK", authService.getMeProfile(user)));
    }

    @PutMapping("/me/profile")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updateProfile(
            @AuthenticationPrincipal AppUser user,
            @RequestBody Map<String, Object> body) {
        if (user == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Chưa đăng nhập"));
        }
        return ResponseEntity.ok(ApiResponse.success("OK", authService.updateProfile(user, body)));
    }
}
