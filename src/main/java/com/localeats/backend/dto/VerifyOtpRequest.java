package com.localeats.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyOtpRequest {

    /** SĐT hoặc Email đã dùng lúc đăng ký */
    @NotBlank(message = "Thiếu thông tin định danh (SĐT/Email)")
    private String identifier;

    @NotBlank(message = "Thiếu mã OTP")
    private String otpCode;
}
