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
@Table(name = "nav_session")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NavSession {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "store_id", nullable = false)
    private UUID storeId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "nav_session_status")
    private NavSessionStatus status;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "end_reason", columnDefinition = "nav_end_reason")
    private NavEndReason endReason;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "mode", nullable = false, columnDefinition = "transport_mode")
    private TransportMode mode;

    @Column(name = "origin_latitude", nullable = false)
    private BigDecimal originLatitude;

    @Column(name = "origin_longitude", nullable = false)
    private BigDecimal originLongitude;

    @Column(name = "origin_accuracy_m")
    private Float originAccuracyM;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "route_provider", columnDefinition = "route_provider")
    private RouteProvider routeProvider;

    @Column(name = "route_distance_m")
    private Integer routeDistanceM;

    @Column(name = "route_duration_s")
    private Integer routeDurationS;

    @Column(name = "route_polyline")
    private String routePolyline;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "route_steps")
    private String routeSteps;

    @Column(name = "reroute_count", nullable = false)
    private Short rerouteCount;

    @Column(name = "started_at", nullable = false)
    private OffsetDateTime startedAt;

    @Column(name = "moving_since")
    private OffsetDateTime movingSince;

    @Column(name = "near_store_since")
    private OffsetDateTime nearStoreSince;

    @Column(name = "dwell_started_at")
    private OffsetDateTime dwellStartedAt;

    @Column(name = "dwell_anchor_lat")
    private BigDecimal dwellAnchorLat;

    @Column(name = "dwell_anchor_lng")
    private BigDecimal dwellAnchorLng;

    @Column(name = "arrived_at")
    private OffsetDateTime arrivedAt;

    @Column(name = "ended_at")
    private OffsetDateTime endedAt;

    @Column(name = "last_ping_at")
    private OffsetDateTime lastPingAt;

    @Column(name = "last_latitude")
    private BigDecimal lastLatitude;

    @Column(name = "last_longitude")
    private BigDecimal lastLongitude;

    @Column(name = "distance_to_store_m")
    private Integer distanceToStoreM;

    @Column(name = "total_traveled_m", nullable = false)
    private Integer totalTraveledM;

    @Column(name = "ping_count", nullable = false)
    private Integer pingCount;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

}
