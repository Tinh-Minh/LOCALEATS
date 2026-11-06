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
@Table(name = "user_challenge_progress")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(UserChallengeProgress.Pk.class)
public class UserChallengeProgress {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @Id
    @Column(name = "challenge_id")
    private UUID challengeId;

    @Id
    @Column(name = "store_id")
    private UUID storeId;

    @Column(name = "visit_id", nullable = false)
    private UUID visitId;

    @Column(name = "completed_at", nullable = false)
    private OffsetDateTime completedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Pk implements Serializable {
        private UUID userId;
        private UUID challengeId;
        private UUID storeId;
    }

}
