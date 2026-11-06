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
@Table(name = "spin_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpinHistory {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "filter")
    private String filter;

    @Column(name = "store_id")
    private UUID storeId;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
