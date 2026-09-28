package com.localeats.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Khớp 1-1 với bảng user_otp_verification.
 * Chỉ lưu HASH của OTP (otpCodeHash) — không bao giờ lưu OTP dạng rõ,
 * đúng comment đã ghi trong file DDL gốc.
 */
@Entity
@Table(name = "user_otp_verification")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OtpVerification {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "otp_code_hash", nullable = false)
    private String otpCodeHash;

    /** "phone" hoặc "email" — khớp CHECK constraint ở DB */
    @Column(nullable = false)
    private String channel;

    @Column(name = "expires_at", nullable = false)
    private OffsetDateTime expiresAt;

    @Column(name = "consumed_at")
    private OffsetDateTime consumedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = OffsetDateTime.now();
    }
}
