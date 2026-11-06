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
@Table(name = "routing_node")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoutingNode {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "provider", nullable = false, columnDefinition = "route_provider")
    private RouteProvider provider;

    @Column(name = "base_url", nullable = false)
    private String baseUrl;

    @Column(name = "region")
    private String region;

    @Column(name = "coverage_radius_km")
    private BigDecimal coverageRadiusKm;

    @Column(name = "center_latitude")
    private BigDecimal centerLatitude;

    @Column(name = "center_longitude")
    private BigDecimal centerLongitude;

    @Column(name = "priority", nullable = false)
    private Short priority;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "node_status")
    private NodeStatus status;

    @Column(name = "last_latency_ms")
    private Integer lastLatencyMs;

    @Column(name = "last_health_at")
    private OffsetDateTime lastHealthAt;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
