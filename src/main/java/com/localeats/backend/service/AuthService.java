package com.localeats.backend.service;

import com.localeats.backend.dto.*;
import com.localeats.backend.entity.AppUser;
import com.localeats.backend.entity.enums.UserRole;
import com.localeats.backend.exception.BadRequestException;
import com.localeats.backend.exception.UnauthorizedException;
import com.localeats.backend.repository.AppUserRepository;
import com.localeats.backend.security.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class AuthService {

    private final AppUserRepository appUserRepository;
    private final OtpService otpService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(AppUserRepository appUserRepository, OtpService otpService,
                       PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.appUserRepository = appUserRepository;
        this.otpService = otpService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /**
     * BR-U01: đăng ký bằng SĐT hoặc Email + mật khẩu.
     * Tài khoản tạo ra ở trạng thái verified=false, phải verify OTP mới dùng được
     * các tính năng khác (BR-U02).
     *
     * Nếu SĐT/Email đã tồn tại NHƯNG tài khoản đó CHƯA verify, cho phép "đăng ký lại":
     * cập nhật password mới nhất + gửi lại OTP, không tạo bản ghi trùng.
     * Chỉ chặn khi tài khoản đã verify rồi.
     */
    @Transactional
    public void register(RegisterRequest request) {
        String phone = blankToNull(request.getPhone());
        String email = blankToNull(request.getEmail());

        AppUser existingUser = findExistingUnverifiedUser(phone, email);

        AppUser user;
        if (existingUser != null) {
            existingUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));
            if (phone != null) existingUser.setPhone(phone);
            if (email != null) existingUser.setEmail(email);
            user = appUserRepository.save(existingUser);
        } else {
            user = AppUser.builder()
                    .phone(phone)
                    .email(email)
                    .passwordHash(passwordEncoder.encode(request.getPassword()))
                    .role(UserRole.user)
                    .verified(false)
                    .build();
            user = appUserRepository.save(user);
        }

        String channel = phone != null ? "phone" : "email";
        String destination = phone != null ? phone : email;
        otpService.generateAndSendOtp(user.getId(), channel, destination);
    }

    /**
     * Kiểm tra phone/email đã tồn tại chưa. Nếu tồn tại và ĐÃ verify -> ném lỗi ngay
     * (không cho đăng ký lại). Nếu tồn tại và CHƯA verify -> trả về user đó để tái sử dụng.
     * Nếu chưa tồn tại -> trả về null (sẽ tạo user mới).
     */
    private AppUser findExistingUnverifiedUser(String phone, String email) {
        AppUser existingUser = null;

        if (phone != null) {
            Optional<AppUser> found = appUserRepository.findByPhone(phone);
            if (found.isPresent()) {
                if (found.get().isVerified()) {
                    throw new BadRequestException("Số điện thoại đã được đăng ký");
                }
                existingUser = found.get();
            }
        }

        if (email != null) {
            Optional<AppUser> found = appUserRepository.findByEmail(email);
            if (found.isPresent()) {
                if (found.get().isVerified()) {
                    throw new BadRequestException("Email đã được đăng ký");
                }
                if (existingUser == null) {
                    existingUser = found.get();
                }
            }
        }

        return existingUser;
    }

    /**
     * BR-U02: xác thực OTP để kích hoạt tài khoản.
     */
    @Transactional
    public AuthResponse verifyOtp(VerifyOtpRequest request) {
        AppUser user = appUserRepository.findByPhoneOrEmail(request.getIdentifier())
                .orElseThrow(() -> new BadRequestException("Không tìm thấy tài khoản"));

        otpService.verifyOtp(user.getId(), request.getOtpCode());

        user.setVerified(true);
        appUserRepository.save(user);

        return buildAuthResponse(user);
    }

    /**
     * Đăng nhập bằng SĐT/Email + mật khẩu, trả JWT.
     * User chưa verify OTP vẫn đăng nhập được (để họ có thể xem bản đồ/tìm đường
     * theo BR-U02), nhưng "verified=false" trong response để Frontend tự chặn
     * các thao tác khác (đánh giá, lưu quán...) ở tầng UI + Backend endpoint tương ứng.
     */
    public AuthResponse login(LoginRequest request) {
        AppUser user = appUserRepository.findByPhoneOrEmail(request.getIdentifier())
                .orElseThrow(() -> new UnauthorizedException("Sai thông tin đăng nhập"));

        if (user.isLocked()) {
            throw new UnauthorizedException("Tài khoản đã bị khóa, vui lòng liên hệ hỗ trợ");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Sai thông tin đăng nhập");
        }

        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(AppUser user) {
        String token = jwtService.generateToken(
                user.getId().toString(),
                Map.of("role", user.getRole().name(), "verified", user.isVerified())
        );

        return AuthResponse.builder()
                .accessToken(token)
                .userId(user.getId())
                .role(user.getRole().name())
                .verified(user.isVerified())
                .build();
    }

    private String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value;
    }
}