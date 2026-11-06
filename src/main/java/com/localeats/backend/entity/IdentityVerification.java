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
@Table(name = "identity_verification")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdentityVerification {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "store_owner_profile_id", nullable = false)
    private UUID storeOwnerProfileId;

    @Column(name = "image_path_encrypted", nullable = false)
    private String imagePathEncrypted;

    @Column(name = "submitted_at", nullable = false)
    private OffsetDateTime submittedAt;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "verification_status")
    private VerificationStatus status;

    @Column(name = "reviewed_by")
    private UUID reviewedBy;

    @Column(name = "reviewed_at")
    private OffsetDateTime reviewedAt;

    @Column(name = "rejection_reason")
    private String rejectionReason;

    @Column(name = "image_delete_at")
    private OffsetDateTime imageDeleteAt;

    @Column(name = "image_deleted", nullable = false)
    private Boolean imageDeleted;

}
