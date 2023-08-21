package com.itth.authorize.repository;

import com.itth.authorize.model.InlineRolePermission;
import com.itth.authorize.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "roles", excerptProjection = InlineRolePermission.class)
public interface RoleRepository extends JpaRepository<Role, String> {
}
