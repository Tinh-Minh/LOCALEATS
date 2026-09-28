package com.localeats.backend.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @Pattern(regexp = "^$|^[0-9]{9,11}$", message = "Số điện thoại không hợp lệ")
    private String phone;

    @Pattern(regexp = "^$|^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", message = "Email không hợp lệ")
    private String email;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự")
    private String password;

    /**
     * BR-U01: bắt buộc có ít nhất SĐT hoặc Email — validate ở tầng DTO
     * TRƯỚC khi chạm DB, tránh ăn phải CHECK constraint rồi trả lỗi SQL thô cho client.
     */
    @AssertTrue(message = "Phải nhập ít nhất Số điện thoại hoặc Email")
    public boolean isContactProvided() {
        boolean hasPhone = phone != null && !phone.isBlank();
        boolean hasEmail = email != null && !email.isBlank();
        return hasPhone || hasEmail;
    }
}
