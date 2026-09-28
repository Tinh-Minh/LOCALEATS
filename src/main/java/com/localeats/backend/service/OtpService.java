package com.localeats.backend.service;

import com.localeats.backend.entity.OtpVerification;
import com.localeats.backend.exception.BadRequestException;
import com.localeats.backend.repository.OtpVerificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.UUID;

@Slf4j
@Service
public class OtpService {

    private static final int OTP_LENGTH = 6;
    private static final int OTP_TTL_MINUTES = 5;
    private static final int OTP_RESEND_COOLDOWN_MINUTES = 5;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final OtpVerificationRepository otpRepository;
    private final EmailService emailService;
    private final BCryptPasswordEncoder otpEncoder = new BCryptPasswordEncoder();

    public OtpService(OtpVerificationRepository otpRepository, EmailService emailService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }

    /**
     * Sinh và gửi OTP mới. BẮT BUỘC đợi đủ OTP_RESEND_COOLDOWN_MINUTES kể từ lần
     * gửi gần nhất (dù OTP đó đã dùng hay chưa) mới được gửi lại — chống spam gửi OTP liên tục.
     * Trong lúc đợi, OTP cũ (nếu chưa dùng và chưa hết hạn) vẫn còn hiệu lực để verify bình thường.
     */
    public void generateAndSendOtp(UUID userId, String channel, String destination) {
        otpRepository.findLatestAny(userId).ifPresent(latest -> {
            OffsetDateTime canResendAt = latest.getCreatedAt().plusMinutes(OTP_RESEND_COOLDOWN_MINUTES);
            if (OffsetDateTime.now().isBefore(canResendAt)) {
                long secondsLeft = Duration.between(OffsetDateTime.now(), canResendAt).getSeconds();
                long minutesLeft = (secondsLeft + 59) / 60; // làm tròn lên
                throw new BadRequestException(
                        "Mã OTP đã được gửi về máy, vui lòng đợi " + minutesLeft +
                                " phút nữa mới có thể nhận mã OTP mới"
                );
            }
        });

        String otpCode = generateNumericOtp();

        OtpVerification otp = OtpVerification.builder()
                .userId(userId)
                .otpCodeHash(otpEncoder.encode(otpCode))
                .channel(channel)
                .expiresAt(OffsetDateTime.now().plusMinutes(OTP_TTL_MINUTES))
                .build();
        otpRepository.save(otp);

        if ("email".equals(channel)) {
            emailService.sendOtpEmail(destination, otpCode);
        } else {
            // TODO: tích hợp SMS provider (eSMS.vn...) khi có tài khoản dịch vụ
            log.info("[OTP-MOCK-SMS] Gửi OTP={} tới SĐT {} (chưa tích hợp SMS thật)", otpCode, destination);
        }
    }

    public void verifyOtp(UUID userId, String otpCode) {
        OtpVerification latest = otpRepository.findLatestUnconsumed(userId)
                .orElseThrow(() -> new BadRequestException("Không tìm thấy OTP hợp lệ, vui lòng yêu cầu gửi lại"));

        if (latest.getExpiresAt().isBefore(OffsetDateTime.now())) {
            throw new BadRequestException("Mã OTP đã hết hạn, vui lòng yêu cầu gửi lại");
        }

        if (!otpEncoder.matches(otpCode, latest.getOtpCodeHash())) {
            throw new BadRequestException("Mã OTP không đúng");
        }

        latest.setConsumedAt(OffsetDateTime.now());
        otpRepository.save(latest);
    }

    private String generateNumericOtp() {
        int number = RANDOM.nextInt(1_000_000);
        return String.format("%0" + OTP_LENGTH + "d", number);
    }
}