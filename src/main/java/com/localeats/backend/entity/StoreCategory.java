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
@Table(name = "store_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(StoreCategory.Pk.class)
public class StoreCategory {

    @Id
    @Column(name = "store_id")
    private UUID storeId;

    @Id
    @Column(name = "category_id")
    private Short categoryId;

    @Column(name = "is_primary", nullable = false)
    private Boolean isPrimary;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Pk implements Serializable {
        private UUID storeId;
        private Short categoryId;
    }

}
