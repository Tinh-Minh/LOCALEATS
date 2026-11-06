package com.localeats.backend.repository;

import com.localeats.backend.entity.NavSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.UUID;

@Repository
public interface NavSessionRepository extends JpaRepository<NavSession, UUID> {
}
