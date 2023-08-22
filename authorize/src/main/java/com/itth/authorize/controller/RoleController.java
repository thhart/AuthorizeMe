package com.itth.authorize.controller;

import com.itth.authorize.model.Permission;
import com.itth.authorize.model.Role;
import com.itth.authorize.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @PostMapping("/{roleId}/permissions")
    public ResponseEntity<Role> modifyPermissions(@PathVariable String roleId, @RequestBody List<Permission> permissions) {
        Role updatedRole = roleService.modifyPermissionsOfRole(roleId, permissions);
        return ResponseEntity.ok(updatedRole);
    }
}
