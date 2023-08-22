package com.itth.authorize.service;

import com.itth.authorize.dto.CredentialsDto;
import com.itth.authorize.dto.SignUpDto;
import com.itth.authorize.dto.UserDto;
import com.itth.authorize.exception.AppException;
import com.itth.authorize.mapper.UserMapper;
import com.itth.authorize.model.Permission;
import com.itth.authorize.model.Role;
import com.itth.authorize.model.User;
import com.itth.authorize.repository.RoleRepository;
import com.itth.authorize.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RoleRepository roleRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.login())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
            final UserDto userDto = userMapper.toUserDto(user);
            userDto.setPermissions(user.getRoles().stream().flatMap(role -> role.getPermissions().stream().map(Permission::getName)).collect(Collectors.toList()));
            return userDto;
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    @Transactional
    public User modifyRolesOfUser(String userId, List<Role> roles) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        final Set<String> stringsProvided = roles.stream().map(Role::getId).collect(Collectors.toSet());
        user.getRoles().retainAll(user.getRoles().stream().filter(role -> stringsProvided.contains(role.getId())).toList());
        final Set<String> stringsAlready = user.getRoles().stream().map(Role::getId).collect(Collectors.toSet());
        user.getRoles().addAll(roleRepository.findAll().stream().filter(role -> stringsProvided.contains(role.getId())).filter(role -> ! stringsAlready.contains(role.getId())).toList());
        return user;
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByLogin(userDto.login());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.password())));

        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(savedUser);
    }

    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

}