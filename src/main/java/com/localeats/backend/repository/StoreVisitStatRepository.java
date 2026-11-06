package com.localeats.backend.repository;

import com.localeats.backend.entity.StoreVisitStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.UUID;

@Repository
public interface StoreVisitStatRepository extends JpaRepository<StoreVisitStat, UUID> {
}
