package com.localeats.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private UUID userId;
    private String role;
    private boolean verified;
}
