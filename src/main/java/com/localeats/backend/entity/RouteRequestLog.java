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
@Table(name = "route_request_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RouteRequestLog {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "store_id")
    private UUID storeId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "mode", nullable = false, columnDefinition = "transport_mode")
    private TransportMode mode;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "provider", nullable = false, columnDefinition = "route_provider")
    private RouteProvider provider;

    @Column(name = "node_id")
    private Integer nodeId;

    @Column(name = "cache_hit", nullable = false)
    private Boolean cacheHit;

    @Column(name = "success", nullable = false)
    private Boolean success;

    @Column(name = "latency_ms")
    private Integer latencyMs;

    @Column(name = "distance_m")
    private Integer distanceM;

    @Column(name = "error")
    private String error;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
