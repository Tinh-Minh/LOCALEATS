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
@Table(name = "trip_stop")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripStop {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "trip_id", nullable = false)
    private UUID tripId;

    @Column(name = "store_id")
    private UUID storeId;

    @Column(name = "stop_order", nullable = false)
    private Short stopOrder;

    @Column(name = "label")
    private String label;

    @Column(name = "latitude", nullable = false)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = false)
    private BigDecimal longitude;

    @Column(name = "leg_distance_m")
    private Integer legDistanceM;

    @Column(name = "leg_duration_s")
    private Integer legDurationS;

    @Column(name = "planned_arrival")
    private OffsetDateTime plannedArrival;

    @Column(name = "visit_id")
    private UUID visitId;

}
