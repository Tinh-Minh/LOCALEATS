package com.localeats.backend.dto;

import lombok.Getter;

/**
 * Wrapper chung cho mọi response — giúp Frontend luôn xử lý 1 format
 * duy nhất (success/message/data) thay vì đoán cấu trúc theo từng endpoint.
 */
@Getter
public class ApiResponse<T> {
    private final boolean success;
    private final String message;
    private final T data;

    private ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null);
    }
}
