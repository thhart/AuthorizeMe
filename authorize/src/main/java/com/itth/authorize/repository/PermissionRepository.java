package com.itth.authorize.repository;

import com.itth.authorize.model.Permission;
import com.itth.authorize.model.ProjectionPermission;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@Transactional
@RepositoryRestResource(path = "permissions", excerptProjection = ProjectionPermission.class)
public interface PermissionRepository extends JpaRepository<Permission, String> {
}
