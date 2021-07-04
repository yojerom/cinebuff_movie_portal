package com.macnell.authservice.repository;

import java.util.Optional;

import com.macnell.authservice.models.ERole;
import com.macnell.authservice.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
