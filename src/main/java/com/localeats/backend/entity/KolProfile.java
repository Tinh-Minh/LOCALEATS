package com.localeats.backend.entity;

import com.localeats.backend.entity.enums.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "kol_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KolProfile {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "tier", nullable = false, columnDefinition = "kol_tier")
    private KolTier tier;

    @Column(name = "follower_count", nullable = false)
    private Integer followerCount;

    @Column(name = "commission_rate", nullable = false)
    private BigDecimal commissionRate;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "social_links")
    private String socialLinks;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "approved_by")
    private UUID approvedBy;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
