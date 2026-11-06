package com.localeats.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResendOtpRequest {
    @NotBlank(message = "Thiếu Số điện thoại hoặc Email")
    private String identifier;
}
