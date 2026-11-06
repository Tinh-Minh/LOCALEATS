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
@Table(name = "ad_event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdEvent {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "campaign_id", nullable = false)
    private UUID campaignId;

    @Column(name = "user_id")
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "type", nullable = false, columnDefinition = "ad_event_type")
    private AdEventType type;

    @Column(name = "cost", nullable = false)
    private BigDecimal cost;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
