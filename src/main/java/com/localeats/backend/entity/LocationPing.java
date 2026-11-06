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
@Table(name = "location_ping")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationPing {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "session_id", nullable = false)
    private UUID sessionId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "latitude", nullable = false)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = false)
    private BigDecimal longitude;

    @Column(name = "accuracy_m")
    private Float accuracyM;

    @Column(name = "speed_mps")
    private Float speedMps;

    @Column(name = "heading_deg")
    private Float headingDeg;

    @Column(name = "battery_pct")
    private Short batteryPct;

    @Column(name = "is_mock", nullable = false)
    private Boolean isMock;

    @Column(name = "recorded_at", nullable = false)
    private OffsetDateTime recordedAt;

    @Column(name = "received_at", nullable = false)
    private OffsetDateTime receivedAt;

}
