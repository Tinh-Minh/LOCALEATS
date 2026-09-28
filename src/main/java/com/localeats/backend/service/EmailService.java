package com.localeats.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otpCode) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            // "true" thứ 2 = multipart, BẮT BUỘC để addInline() hoạt động
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Mã xác thực LocalEats của bạn");
            helper.setText(buildOtpHtml(otpCode), true);

            // Nhúng ảnh logo, tham chiếu qua "cid:logo" trong HTML bên dưới
            helper.addInline("logo", new ClassPathResource("static/logo-flame-pin.png"));

            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("Gửi email OTP thất bại tới {}", toEmail, e);
            throw new RuntimeException("Không thể gửi email OTP, vui lòng thử lại");
        }
    }

    private String buildOtpHtml(String otpCode) {
        return """
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background-color:#FFF8F0;font-family:Arial,Helvetica,sans-serif;">
          <table width="100%%" cellpadding="0" cellspacing="0" style="background-color:#FFF8F0;padding:32px 0;">
            <tr>
              <td align="center">
                <table width="480" cellpadding="0" cellspacing="0"
                       style="background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(232,69,31,0.12);">

                  <tr>
                    <td style="background-color:#FFFFFF;padding:28px;text-align:center;border-bottom:1px solid #F5E4D8;">
                      <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                        <tr>
                          <td style="vertical-align:middle;padding-right:10px;">
                            <img src="cid:logo" width="40" height="40" alt="LocalEats" style="display:block;" />
                          </td>
                          <td style="vertical-align:middle;">
                            <span style="font-size:24px;font-weight:bold;color:#E8451F;letter-spacing:0.5px;">LocalEats</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:32px 32px 8px 32px;text-align:center;">
                      <p style="font-size:16px;color:#3D3D3A;margin:0 0 8px 0;">Mã xác thực của bạn là</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 32px;text-align:center;">
                      <div style="display:inline-block;background-color:#FFF1E6;border:2px dashed #E8451F;
                                  border-radius:12px;padding:16px 32px;margin:8px 0 24px 0;">
                        <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#E8451F;">%s</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 32px 8px 32px;text-align:center;">
                      <span style="display:inline-block;background-color:#FDB913;color:#FFFFFF;font-size:12px;
                                   font-weight:bold;padding:4px 12px;border-radius:20px;">⏱ Hiệu lực 5 phút</span>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:16px 32px 32px 32px;text-align:center;">
                      <p style="font-size:14px;color:#73726C;margin:0;">
                        Vui lòng không chia sẻ mã này cho bất kỳ ai, kể cả nhân viên LocalEats.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="background-color:#FFF8F0;padding:16px;text-align:center;
                                border-top:1px solid #F5E4D8;">
                      <span style="font-size:12px;color:#9C9A92;">© 2026 LocalEats — Tìm quán ăn ngon quanh bạn</span>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        """.formatted(otpCode);
    }
}