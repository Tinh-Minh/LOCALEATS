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
    private static final int OTP_RESEND_COOLDOWN_MINUTES = 1;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final OtpVerificationRepository otpRepository;
    private final EmailService emailService;
    private final ZaloZnsService zaloZnsService;
    private final BCryptPasswordEncoder otpEncoder = new BCryptPasswordEncoder();

    public OtpService(OtpVerificationRepository otpRepository,
                      EmailService emailService,
                      ZaloZnsService zaloZnsService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService;
        this.zaloZnsService = zaloZnsService;
    }

    public String generateAndSendOtp(UUID userId, String channel, String destination) {
        otpRepository.findLatestAny(userId).ifPresent(latest -> {
            OffsetDateTime canResendAt = latest.getCreatedAt().plusMinutes(OTP_RESEND_COOLDOWN_MINUTES);
            if (OffsetDateTime.now().isBefore(canResendAt)) {
                long secondsLeft = Duration.between(OffsetDateTime.now(), canResendAt).getSeconds();
                throw new BadRequestException(
                        "Mã OTP vừa được gửi, vui lòng đợi " + Math.max(1, secondsLeft) + " giây nữa để gửi lại"
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

        if ("email".equalsIgnoreCase(channel)) {
            try {
                emailService.sendOtpEmail(destination, otpCode);
            } catch (Exception ex) {
                log.warn("[OTP-EMAIL-FALLBACK] Không gửi được SMTP ({}), mã OTP cho {} là: {}", ex.getMessage(), destination, otpCode);
            }
        } else {
            zaloZnsService.sendOtp(destination, otpCode);
        }
        return otpCode;
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
