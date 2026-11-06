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
@Table(name = "invoice")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "invoice_no", nullable = false)
    private String invoiceNo;

    @Column(name = "payment_id")
    private UUID paymentId;

    @Column(name = "owner_id")
    private UUID ownerId;

    @Column(name = "buyer_name", nullable = false)
    private String buyerName;

    @Column(name = "buyer_tax_code")
    private String buyerTaxCode;

    @Column(name = "subtotal", nullable = false)
    private BigDecimal subtotal;

    @Column(name = "vat_rate", nullable = false)
    private BigDecimal vatRate;

    @Column(name = "vat_amount", nullable = false)
    private BigDecimal vatAmount;

    @Column(name = "total", nullable = false)
    private BigDecimal total;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "invoice_status")
    private InvoiceStatus status;

    @Column(name = "pdf_url")
    private String pdfUrl;

    @Column(name = "issued_at")
    private OffsetDateTime issuedAt;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

}
