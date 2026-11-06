package com.localeats.backend.service;

import com.localeats.backend.dto.*;
import com.localeats.backend.entity.AppUser;
import com.localeats.backend.entity.UserSession;
import com.localeats.backend.entity.enums.UserRole;
import com.localeats.backend.exception.BadRequestException;
import com.localeats.backend.exception.UnauthorizedException;
import com.localeats.backend.repository.AppUserRepository;
import com.localeats.backend.repository.UserSessionRepository;
import com.localeats.backend.security.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.*;

@Slf4j
@Service
public class AuthService {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private final AppUserRepository appUserRepository;
    private final UserSessionRepository userSessionRepository;
    private final OtpService otpService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final NamedParameterJdbcTemplate jdbc;
    private final long refreshExpirationDays;

    public AuthService(AppUserRepository appUserRepository,
                       UserSessionRepository userSessionRepository,
                       OtpService otpService,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       NamedParameterJdbcTemplate jdbc,
                       @Value("${app.jwt.refresh-expiration-days:30}") long refreshExpirationDays) {
        this.appUserRepository = appUserRepository;
        this.userSessionRepository = userSessionRepository;
        this.otpService = otpService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.jdbc = jdbc;
        this.refreshExpirationDays = refreshExpirationDays;
    }

    @Transactional
    public Map<String, Object> register(RegisterRequest request) {
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

        // Uu tien gui email neu co email, neu chi co SDT thi gui qua Zalo ZNS
        String channel = (email != null) ? "email" : "phone";
        String destination = (email != null) ? email : phone;
        otpService.generateAndSendOtp(user.getId(), channel, destination);

        Map<String, Object> res = new LinkedHashMap<>();
        res.put("userId", user.getId());
        res.put("channel", channel);
        res.put("destination", destination);
        return res;
    }

    @Transactional
    public void resendOtp(ResendOtpRequest request) {
        AppUser user = appUserRepository.findByPhoneOrEmail(request.getIdentifier().trim())
                .orElseThrow(() -> new BadRequestException("Không tìm thấy tài khoản với thông tin này"));
        String id = request.getIdentifier().trim();
        String channel = id.contains("@") ? "email" : "phone";
        String dest = id.contains("@") ? user.getEmail() : user.getPhone();
        otpService.generateAndSendOtp(user.getId(), channel, dest);
    }

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

    @Transactional
    public AuthResponse verifyOtp(VerifyOtpRequest request, String deviceInfo, String ipAddress) {
        AppUser user = appUserRepository.findByPhoneOrEmail(request.getIdentifier().trim())
                .orElseThrow(() -> new BadRequestException("Không tìm thấy tài khoản"));

        otpService.verifyOtp(user.getId(), request.getOtpCode().trim());

        user.setVerified(true);
        appUserRepository.save(user);

        return issueTokens(user, UUID.randomUUID(), deviceInfo, ipAddress);
    }

    @Transactional
    public AuthResponse login(LoginRequest request, String deviceInfo, String ipAddress) {
        AppUser user = appUserRepository.findByPhoneOrEmail(request.getIdentifier().trim())
                .orElseThrow(() -> new UnauthorizedException("Sai thông tin đăng nhập"));

        if (user.isLocked()) {
            throw new UnauthorizedException("Tài khoản đã bị khóa, vui lòng liên hệ hỗ trợ");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Sai thông tin đăng nhập");
        }

        return issueTokens(user, UUID.randomUUID(), deviceInfo, ipAddress);
    }

    @Transactional
    public AuthResponse refresh(RefreshTokenRequest request, String deviceInfo, String ipAddress) {
        String hash = sha256Hex(request.getRefreshToken().trim());
        UserSession session = userSessionRepository.findByRefreshHash(hash)
                .orElseThrow(() -> new UnauthorizedException("Refresh token không hợp lệ"));

        OffsetDateTime now = OffsetDateTime.now();
        if (session.getReplacedAt() != null) {
            // Token da duoc xoay vong nhung bi mang ra dung lai -> thu hoi ca chuoi
            userSessionRepository.revokeFamily(session.getFamilyId(), now);
            throw new UnauthorizedException("Phát hiện sử dụng lại refresh token cũ, phiên đăng nhập đã bị thu hồi");
        }
        if (session.getRevokedAt() != null || session.getExpiresAt().isBefore(now)) {
            throw new UnauthorizedException("Refresh token đã hết hạn hoặc bị thu hồi");
        }

        AppUser user = appUserRepository.findById(session.getUserId())
                .orElseThrow(() -> new UnauthorizedException("Không tìm thấy người dùng"));
        if (user.isLocked()) {
            throw new UnauthorizedException("Tài khoản đã bị khóa");
        }

        session.setReplacedAt(now);
        userSessionRepository.save(session);

        return issueTokens(user, session.getFamilyId(), deviceInfo, ipAddress);
    }

    @Transactional
    public void logout(String rawRefreshToken) {
        if (rawRefreshToken == null || rawRefreshToken.isBlank()) return;
        String hash = sha256Hex(rawRefreshToken.trim());
        userSessionRepository.findByRefreshHash(hash).ifPresent(s -> {
            userSessionRepository.revokeFamily(s.getFamilyId(), OffsetDateTime.now());
        });
    }

    @Transactional
    public Map<String, Object> forgotPassword(String identifier, String channelPref) {
        if (identifier == null || identifier.isBlank()) {
            throw new BadRequestException("Vui lòng nhập Email hoặc Số điện thoại");
        }
        String clean = identifier.trim();
        AppUser user = appUserRepository.findByPhoneOrEmail(clean)
                .orElseThrow(() -> new BadRequestException("Không tìm thấy tài khoản với thông tin này"));

        String channel = (channelPref != null && !channelPref.isBlank())
                ? channelPref.trim().toLowerCase()
                : (clean.contains("@") || user.getPhone() == null ? "email" : "phone");
        String destination = "email".equals(channel) ? user.getEmail() : user.getPhone();
        otpService.generateAndSendOtp(user.getId(), channel, destination);
        return Map.of("userId", user.getId(), "channel", channel, "destination", destination);
    }

    @Transactional
    public void resetPassword(String identifier, String otp, String newPassword) {
        if (identifier == null || otp == null || newPassword == null || newPassword.length() < 6) {
            throw new BadRequestException("Thông tin đặt lại mật khẩu không hợp lệ");
        }
        String clean = identifier.trim();
        AppUser user = appUserRepository.findByPhoneOrEmail(clean)
                .orElseThrow(() -> new BadRequestException("Không tìm thấy tài khoản"));
        otpService.verifyOtp(user.getId(), otp.trim());
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setVerified(true);
        appUserRepository.save(user);
    }

    public Map<String, Object> getMeProfile(AppUser user) {
        Map<String, Object> profile = new LinkedHashMap<>();
        profile.put("id", user.getId());
        profile.put("email", user.getEmail());
        profile.put("phone", user.getPhone());
        profile.put("role", user.getRole().name());
        profile.put("verified", user.isVerified());
        profile.put("premium", user.isPremium());
        profile.put("createdAt", user.getCreatedAt());

        List<Map<String, Object>> extra = jdbc.queryForList("""
                SELECT display_name AS "displayName", avatar_url AS "avatarUrl",
                       bio, default_mode AS "defaultMode", share_location AS "shareLocation", locale
                FROM user_profile WHERE user_id = :uid
                """, Map.of("uid", user.getId()));
        if (!extra.isEmpty()) {
            profile.putAll(extra.get(0));
        }
        return profile;
    }

    @Transactional
    public Map<String, Object> updateProfile(AppUser user, Map<String, Object> body) {
        String displayName = String.valueOf(body.getOrDefault("displayName", "Thực khách LocalEats"));
        String avatarUrl = body.get("avatarUrl") != null ? String.valueOf(body.get("avatarUrl")) : null;
        String bio = body.get("bio") != null ? String.valueOf(body.get("bio")) : "";
        String mode = String.valueOf(body.getOrDefault("defaultMode", "bike"));
        if (!List.of("bike", "car", "walk").contains(mode)) mode = "bike";
        boolean shareLoc = body.get("shareLocation") == null || Boolean.TRUE.equals(body.get("shareLocation"));

        jdbc.update("""
                INSERT INTO user_profile (user_id, display_name, avatar_url, bio, default_mode, share_location)
                VALUES (:uid, :dn, :av, :bio, CAST(:m AS transport_mode), :sl)
                ON CONFLICT (user_id) DO UPDATE SET
                    display_name = EXCLUDED.display_name,
                    avatar_url = COALESCE(EXCLUDED.avatar_url, user_profile.avatar_url),
                    bio = EXCLUDED.bio,
                    default_mode = EXCLUDED.default_mode,
                    share_location = EXCLUDED.share_location,
                    updated_at = now()
                """, new MapSqlParameterSource()
                .addValue("uid", user.getId())
                .addValue("dn", displayName)
                .addValue("av", avatarUrl)
                .addValue("bio", bio)
                .addValue("m", mode)
                .addValue("sl", shareLoc));
        return getMeProfile(user);
    }

    private AuthResponse issueTokens(AppUser user, UUID familyId, String deviceInfo, String ipAddress) {
        String accessToken = jwtService.generateAccessToken(
                user.getId().toString(),
                Map.of(
                        "role", user.getRole().name(),
                        "verified", user.isVerified(),
                        "premium", user.isPremium()
                )
        );

        byte[] randomBytes = new byte[48];
        SECURE_RANDOM.nextBytes(randomBytes);
        String rawRefresh = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

        UserSession session = UserSession.builder()
                .userId(user.getId())
                .familyId(familyId)
                .refreshHash(sha256Hex(rawRefresh))
                .deviceInfo(deviceInfo)
                .ipAddress(ipAddress)
                .expiresAt(OffsetDateTime.now().plusDays(refreshExpirationDays))
                .build();
        userSessionRepository.save(session);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(rawRefresh)
                .expiresInSeconds(jwtService.getAccessExpirationSeconds())
                .userId(user.getId())
                .role(user.getRole().name())
                .verified(user.isVerified())
                .build();
    }

    public static String sha256Hex(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder(64);
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    private String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }
}
