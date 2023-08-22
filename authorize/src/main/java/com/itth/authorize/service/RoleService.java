package com.itth.authorize.service;

import com.itth.authorize.model.Permission;
import com.itth.authorize.model.Role;
import com.itth.authorize.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public Role addPermissionsToRole(String roleId, List<Permission> permissions) {
        Role role = roleRepository.findById(roleId).orElseThrow(() -> new EntityNotFoundException("Role not found"));
        role.getPermissions().addAll(permissions);
        return roleRepository.save(role);
    }
}