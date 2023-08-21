package com.itth.authorize.model;

import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "InlineRolePermission", types = { Role.class })
public interface InlineRolePermission {
    String getId();
    String getName();
    Set<Permission> getPermissions();
}
