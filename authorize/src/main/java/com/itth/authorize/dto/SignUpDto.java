package com.itth.authorize.dto;

public record SignUpDto (String firstName, String lastName, String email, String login, char[] password) { }