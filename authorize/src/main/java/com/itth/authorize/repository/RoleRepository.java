package com.itth.authorize.repository;

import com.itth.authorize.model.ProjectionRole;
import com.itth.authorize.model.Role;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@Transactional
@RepositoryRestResource(path = "roles", excerptProjection = ProjectionRole.class)
public interface RoleRepository extends JpaRepository<Role, String> {
}
