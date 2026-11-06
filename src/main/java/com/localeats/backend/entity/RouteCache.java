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
@Table(name = "route_cache")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteCache {

    @Id
    @Column(name = "id")
    private Long id;

    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "cache_key", nullable = false)
    private String cacheKey;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "mode", nullable = false, columnDefinition = "transport_mode")
    private TransportMode mode;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "provider", nullable = false, columnDefinition = "route_provider")
    private RouteProvider provider;

    @Column(name = "distance_m", nullable = false)
    private Integer distanceM;

    @Column(name = "duration_s", nullable = false)
    private Integer durationS;

    @Column(name = "polyline", nullable = false)
    private String polyline;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "steps")
    private String steps;

    @Column(name = "expires_at", nullable = false)
    private OffsetDateTime expiresAt;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
