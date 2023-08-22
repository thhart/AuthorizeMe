package com.itth.authorize.model;

import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "ProjectionUser", types = { User.class })
public interface ProjectionUser {
    String getId();
    String getLogin();
    String getEmail();
    Set<Role> getRoles();
}
