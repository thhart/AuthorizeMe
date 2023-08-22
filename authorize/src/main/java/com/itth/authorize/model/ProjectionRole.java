package com.itth.authorize.model;

import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "ProjectionRole", types = { Role.class })
public interface ProjectionRole {
    String getId();
    String getName();
    Set<Permission> getPermissions();
}
