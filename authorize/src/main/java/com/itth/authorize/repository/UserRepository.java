package com.itth.authorize.repository;

import com.itth.authorize.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByLogin(String username);
}
