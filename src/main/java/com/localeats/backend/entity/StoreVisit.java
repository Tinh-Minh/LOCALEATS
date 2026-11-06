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
@Table(name = "store_visit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreVisit {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "store_id", nullable = false)
    private UUID storeId;

    @Column(name = "session_id")
    private UUID sessionId;

    @Column(name = "arrived_at", nullable = false)
    private OffsetDateTime arrivedAt;

    @Column(name = "dwell_seconds", nullable = false)
    private Integer dwellSeconds;

    @Column(name = "confirm_method", nullable = false)
    private String confirmMethod;

    @Column(name = "distance_to_store_m")
    private Integer distanceToStoreM;

    @Column(name = "travel_distance_m")
    private Integer travelDistanceM;

    @Column(name = "travel_seconds")
    private Integer travelSeconds;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "mode", columnDefinition = "transport_mode")
    private TransportMode mode;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
