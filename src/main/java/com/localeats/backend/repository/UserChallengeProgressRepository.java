package com.localeats.backend.repository;

import com.localeats.backend.entity.UserChallengeProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.UUID;

@Repository
public interface UserChallengeProgressRepository extends JpaRepository<UserChallengeProgress, UserChallengeProgress.Pk> {
}
