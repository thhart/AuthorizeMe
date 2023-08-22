package com.itth.authorize.controller;

import com.itth.authorize.model.Role;
import com.itth.authorize.model.User;
import com.itth.authorize.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/{userId}/roles")
    public ResponseEntity<User> modifyRoles(@PathVariable String userId, @RequestBody List<Role> roles) {
        User updatedRole = userService.modifyRolesOfUser(userId, roles);
        return ResponseEntity.ok(updatedRole);
    }
}
