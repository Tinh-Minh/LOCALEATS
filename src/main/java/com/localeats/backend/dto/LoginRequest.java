package com.localeats.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    /** Đăng nhập bằng SĐT hoặc Email đều được (BR-U01) */
    @NotBlank(message = "Vui lòng nhập Số điện thoại hoặc Email")
    private String identifier;

    @NotBlank(message = "Vui lòng nhập mật khẩu")
    private String password;
}
