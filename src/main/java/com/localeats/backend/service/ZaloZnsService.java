package com.localeats.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

/**
 * Gui OTP qua Zalo Notification Service (ZNS) cho tai khoan dang ky bang SDT.
 * - Khi app.zalo.enabled=false (mac dinh dev): CHI in OTP ra log, khong goi mang.
 * - Khi enabled=true: goi https://business.openapi.zalo.me/message/template,
 *   neu access_token het han (-124) tu dong refresh qua oauth.zaloapp.com/v4/oa/access_token.
 */
@Slf4j
@Service
public class ZaloZnsService {

    private static final String ZNS_URL = "https://business.openapi.zalo.me/message/template";
    private static final String OAUTH_URL = "https://oauth.zaloapp.com/v4/oa/access_token";

    private final boolean enabled;
    private final String appId;
    private final String secretKey;
    private final String templateId;
    private volatile String accessToken;
    private volatile String refreshToken;
    private final RestClient http = RestClient.create();
    private final ObjectMapper mapper = new ObjectMapper();

    public ZaloZnsService(
            @Value("${app.zalo.enabled:false}") boolean enabled,
            @Value("${app.zalo.app-id:}") String appId,
            @Value("${app.zalo.secret-key:}") String secretKey,
            @Value("${app.zalo.otp-template-id:}") String templateId,
            @Value("${app.zalo.access-token:}") String accessToken,
            @Value("${app.zalo.refresh-token:}") String refreshToken) {
        this.enabled = enabled;
        this.appId = appId;
        this.secretKey = secretKey;
        this.templateId = templateId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public void sendOtp(String rawPhone, String otpCode) {
        String phone84 = to84Format(rawPhone);
        if (!enabled) {
            log.info("[OTP-DEV-ZALO] SDT={} OTP={} (app.zalo.enabled=false)", phone84, otpCode);
            return;
        }
        int err = callZns(phone84, otpCode);
        if (err == -124 && refreshAccessToken()) {
            err = callZns(phone84, otpCode);
        }
        if (err != 0) {
            throw new RuntimeException("Gửi OTP Zalo thất bại (error=" + err + ")");
        }
    }

    private int callZns(String phone84, String otpCode) {
        try {
            Map<String, Object> body = Map.of(
                    "phone", phone84,
                    "template_id", templateId,
                    "template_data", Map.of("otp", otpCode),
                    "tracking_id", UUID.randomUUID().toString()
            );
            String resp = http.post().uri(ZNS_URL)
                    .header("access_token", accessToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(String.class);
            JsonNode json = mapper.readTree(resp);
            return json.path("error").asInt(-1);
        } catch (Exception e) {
            log.error("Loi goi Zalo ZNS toi {}", phone84, e);
            return -1;
        }
    }

    private synchronized boolean refreshAccessToken() {
        if (refreshToken == null || refreshToken.isBlank()) return false;
        try {
            String form = "app_id=" + URLEncoder.encode(appId, StandardCharsets.UTF_8)
                    + "&grant_type=refresh_token&refresh_token="
                    + URLEncoder.encode(refreshToken, StandardCharsets.UTF_8);
            String resp = http.post().uri(OAUTH_URL)
                    .header("secret_key", secretKey)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(form)
                    .retrieve()
                    .body(String.class);
            JsonNode json = mapper.readTree(resp);
            if (json.hasNonNull("access_token")) {
                this.accessToken = json.get("access_token").asText();
                if (json.hasNonNull("refresh_token")) {
                    this.refreshToken = json.get("refresh_token").asText();
                }
                log.info("Da refresh Zalo OA access_token thanh cong");
                return true;
            }
        } catch (Exception e) {
            log.error("Refresh Zalo token that bai", e);
        }
        return false;
    }

    /** Zalo ZNS yeu cau dinh dang 84xxxxxxxxx (bo so 0 dau) */
    public static String to84Format(String phone) {
        String digits = phone.replaceAll("\\D", "");
        if (digits.startsWith("0")) return "84" + digits.substring(1);
        if (digits.startsWith("84")) return digits;
        return "84" + digits;
    }
}
