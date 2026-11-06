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
@Table(name = "user_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "bio")
    private String bio;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "taste_tags", nullable = false)
    private List<String> tasteTags;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "default_mode", nullable = false, columnDefinition = "transport_mode")
    private TransportMode defaultMode;

    @Column(name = "home_latitude")
    private BigDecimal homeLatitude;

    @Column(name = "home_longitude")
    private BigDecimal homeLongitude;

    @Column(name = "share_location", nullable = false)
    private Boolean shareLocation;

    @Column(name = "locale", nullable = false)
    private String locale;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

}
