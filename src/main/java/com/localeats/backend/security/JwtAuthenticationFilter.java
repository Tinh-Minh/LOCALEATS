package com.localeats.backend.security;

import com.localeats.backend.entity.AppUser;
import com.localeats.backend.repository.AppUserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Đọc header "Authorization: Bearer <token>", verify chữ ký + hạn dùng,
 * rồi nạp AppUser tương ứng vào SecurityContext để Controller phía sau
 * dùng @PreAuthorize("hasRole('STAFF')") v.v. được.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final AppUserRepository appUserRepository;

    public JwtAuthenticationFilter(JwtService jwtService, AppUserRepository appUserRepository) {
        this.jwtService = jwtService;
        this.appUserRepository = appUserRepository;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        if (jwtService.isTokenValid(token)) {
            Claims claims = jwtService.parseClaims(token);
            UUID userId = UUID.fromString(claims.getSubject());

            Optional<AppUser> userOpt = appUserRepository.findById(userId);
            if (userOpt.isPresent() && !userOpt.get().isLocked()) {
                AppUser user = userOpt.get();
                var authority = new SimpleGrantedAuthority("ROLE_" + user.getRole().name().toUpperCase());

                var authToken = new UsernamePasswordAuthenticationToken(
                        user, null, List.of(authority));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
