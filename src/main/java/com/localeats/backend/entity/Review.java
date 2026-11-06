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
@Table(name = "review")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "store_id", nullable = false)
    private UUID storeId;

    @Column(name = "rating", nullable = false)
    private Short rating;

    @Column(name = "title")
    private String title;

    @Column(name = "comment")
    private String comment;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "image_urls")
    private List<String> imageUrls;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "review_status")
    private ReviewStatus status;

    @Column(name = "hidden_reason")
    private String hiddenReason;

    @Column(name = "is_verified_visit", nullable = false)
    private Boolean isVerifiedVisit;

    @Column(name = "like_count", nullable = false)
    private Integer likeCount;

    @Column(name = "ai_sentiment")
    private BigDecimal aiSentiment;

    @Column(name = "ai_spam_score")
    private BigDecimal aiSpamScore;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @Column(name = "visit_id")
    private UUID visitId;

}
