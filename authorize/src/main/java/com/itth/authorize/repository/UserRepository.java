package com.itth.authorize.repository;

import com.itth.authorize.model.ProjectionUser;
import com.itth.authorize.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@Transactional
@RepositoryRestResource(path = "users", excerptProjection = ProjectionUser.class)
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByLogin(String username);
}
