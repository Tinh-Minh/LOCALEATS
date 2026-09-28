package com.localeats.backend.repository;

import com.localeats.backend.entity.OtpVerification;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, UUID> {

    /**
     * Lấy OTP mới nhất, chưa dùng (consumedAt IS NULL), của 1 user.
     * Dùng để verify OTP.
     */
    @Query("SELECT o FROM OtpVerification o WHERE o.userId = :userId AND o.consumedAt IS NULL " +
            "ORDER BY o.createdAt DESC")
    List<OtpVerification> findLatestUnconsumedByUserId(UUID userId, Pageable pageable);

    default Optional<OtpVerification> findLatestUnconsumed(UUID userId) {
        var results = findLatestUnconsumedByUserId(userId, PageRequest.of(0, 1));
        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }

    /**
     * Lấy OTP mới nhất của 1 user, BẤT KỂ đã dùng hay chưa — dùng để tính
     * rate-limit "phải đợi 5 phút mới được gửi OTP mới".
     */
    @Query("SELECT o FROM OtpVerification o WHERE o.userId = :userId ORDER BY o.createdAt DESC")
    List<OtpVerification> findLatestByUserId(UUID userId, Pageable pageable);

    default Optional<OtpVerification> findLatestAny(UUID userId) {
        var results = findLatestByUserId(userId, PageRequest.of(0, 1));
        return results.isEmpty() ? Optional.empty() : Optional.of(results.get(0));
    }
}