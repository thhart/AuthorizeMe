package com.itth.authorize.model;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "ProjectionPermission", types = { Permission.class })
public interface ProjectionPermission {
    String getId();
    String getName();
    String getDescription();
}
