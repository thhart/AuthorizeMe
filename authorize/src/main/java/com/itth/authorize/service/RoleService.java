package com.itth.authorize.service;

import com.itth.authorize.model.Permission;
import com.itth.authorize.model.Role;
import com.itth.authorize.repository.PermissionRepository;
import com.itth.authorize.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PermissionRepository permissionRepository;

    @Transactional
    public Role modifyPermissionsOfRole(String roleId, List<Permission> permissions) {
        Role role = roleRepository.findById(roleId).orElseThrow(() -> new EntityNotFoundException("Role not found"));
        final Set<String> stringsProvided = permissions.stream().map(Permission::getId).collect(Collectors.toSet());
        role.getPermissions().retainAll(role.getPermissions().stream().filter(permission -> stringsProvided.contains(permission.getId())).toList());
        final Set<String> stringsAlready = role.getPermissions().stream().map(Permission::getId).collect(Collectors.toSet());
        role.getPermissions().addAll(permissionRepository.findAll().stream().filter(permission -> stringsProvided.contains(permission.getId())).filter(permission -> ! stringsAlready.contains(permission.getId())).toList());
        return role;
    }
}