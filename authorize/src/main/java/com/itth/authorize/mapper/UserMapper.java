package com.itth.authorize.mapper;

import com.itth.authorize.dto.SignUpDto;
import com.itth.authorize.dto.UserDto;
import com.itth.authorize.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}