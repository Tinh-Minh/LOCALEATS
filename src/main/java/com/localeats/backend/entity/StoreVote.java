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
@Table(name = "store_vote")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(StoreVote.Pk.class)
public class StoreVote {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Id
    @Column(name = "store_id")
    private UUID storeId;

    @Id
    @Column(name = "voted_on")
    private LocalDate votedOn;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Pk implements Serializable {
        private UUID userId;
        private UUID storeId;
        private LocalDate votedOn;
    }

}
