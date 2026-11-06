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
@Table(name = "store_event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreEvent {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "store_id", nullable = false)
    private UUID storeId;

    @Column(name = "user_id")
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "type", nullable = false, columnDefinition = "store_event_type")
    private StoreEventType type;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "meta")
    private String meta;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
