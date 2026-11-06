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
@Table(name = "ai_recommendation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiRecommendation {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "model_id")
    private Integer modelId;

    @Column(name = "prompt_text")
    private String promptText;

    @Column(name = "mood_code")
    private String moodCode;

    @Column(name = "budget_code")
    private String budgetCode;

    @Column(name = "distance_code")
    private String distanceCode;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "tags")
    private List<String> tags;

    @Column(name = "latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    private BigDecimal longitude;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "result_store_ids")
    private List<UUID> resultStoreIds;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "result_item_ids")
    private List<UUID> resultItemIds;

    @Column(name = "latency_ms")
    private Integer latencyMs;

    @Column(name = "feedback")
    private Short feedback;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
