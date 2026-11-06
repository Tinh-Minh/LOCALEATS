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
@Table(name = "livestream_message")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LivestreamMessage {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "livestream_id", nullable = false)
    private UUID livestreamId;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
