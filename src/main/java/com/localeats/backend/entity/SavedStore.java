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
@Table(name = "saved_store")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(SavedStore.Pk.class)
public class SavedStore {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Id
    @Column(name = "store_id")
    private UUID storeId;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Pk implements Serializable {
        private UUID userId;
        private UUID storeId;
    }

}
