package com.localeats.backend.repository;

import com.localeats.backend.entity.UserAdminRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.UUID;

@Repository
public interface UserAdminRoleRepository extends JpaRepository<UserAdminRole, UserAdminRole.Pk> {
}
