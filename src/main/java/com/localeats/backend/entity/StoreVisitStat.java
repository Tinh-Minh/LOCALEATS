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
@Table(name = "store_visit_stat")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreVisitStat {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "store_id", nullable = false)
    private UUID storeId;

    @Column(name = "stat_date", nullable = false)
    private LocalDate statDate;

    @Column(name = "search_count", nullable = false)
    private Integer searchCount;

    @Column(name = "view_count", nullable = false)
    private Integer viewCount;

    @Column(name = "route_requested_count", nullable = false)
    private Integer routeRequestedCount;

    @Column(name = "visit_confirmed_count", nullable = false)
    private Integer visitConfirmedCount;

    @Column(name = "avg_dwell_seconds")
    private Integer avgDwellSeconds;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "peak_hour_histogram")
    private String peakHourHistogram;

}
