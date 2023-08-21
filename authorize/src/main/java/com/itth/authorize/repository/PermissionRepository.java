package com.itth.authorize.repository;

import com.itth.authorize.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "permissions")
public interface PermissionRepository extends JpaRepository<Permission, String> {
}
