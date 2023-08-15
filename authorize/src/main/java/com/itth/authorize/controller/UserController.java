package com.itth.authorize.controller;

import com.itth.authorize.UserRepository;
import com.itth.authorize.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable String id) {
        return userRepository.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void post(@RequestBody User user) {
        userRepository.save(user);
    }
}