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
@Table(name = "admin_ip_allowlist")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminIpAllowlist {

    @Id
    @Column(name = "id")
    private Integer id;

    @JdbcTypeCode(SqlTypes.INET)
    @Column(name = "cidr", nullable = false, columnDefinition = "cidr")
    private String cidr;

    @Column(name = "label")
    private String label;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
