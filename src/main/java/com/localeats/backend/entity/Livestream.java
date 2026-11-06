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
@Table(name = "livestream")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Livestream {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "store_id")
    private UUID storeId;

    @Column(name = "host_user_id", nullable = false)
    private UUID hostUserId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "category_id")
    private Short categoryId;

    @Column(name = "stream_url")
    private String streamUrl;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "live_status")
    private LiveStatus status;

    @Column(name = "viewer_peak", nullable = false)
    private Integer viewerPeak;

    @Column(name = "like_count", nullable = false)
    private Integer likeCount;

    @Column(name = "scheduled_at")
    private OffsetDateTime scheduledAt;

    @Column(name = "started_at")
    private OffsetDateTime startedAt;

    @Column(name = "ended_at")
    private OffsetDateTime endedAt;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
