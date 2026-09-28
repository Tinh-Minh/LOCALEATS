package com.localeats.backend.repository;

import com.localeats.backend.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AppUserRepository extends JpaRepository<AppUser, UUID> {

    Optional<AppUser> findByPhone(String phone);

    Optional<AppUser> findByEmail(String email);

    boolean existsByPhone(String phone);

    boolean existsByEmail(String email);

    /**
     * Dùng chung cho login bằng SĐT hoặc Email (BR-U01: user có thể đăng ký
     * bằng 1 trong 2, nên login cũng phải chấp nhận cả 2).
     */
    default Optional<AppUser> findByPhoneOrEmail(String identifier) {
        Optional<AppUser> byPhone = findByPhone(identifier);
        return byPhone.isPresent() ? byPhone : findByEmail(identifier);
    }
}
