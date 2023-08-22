package com.itth.authorize.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling(customizer -> customizer.authenticationEntryPoint(userAuthenticationEntryPoint))
                .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(HttpMethod.POST, "/login", "/register", "/check").permitAll()
                        .requestMatchers(HttpMethod.GET, "/check", "/error", "/favicon.ico").permitAll()
                        .requestMatchers(HttpMethod.GET, "/actuator/**").permitAll()  // Allow all actuator endpoints
                        .requestMatchers(HttpMethod.GET, "/**").permitAll()  // Allow all actuator endpoints
                        .requestMatchers(HttpMethod.POST, "/**").permitAll()  // Allow all actuator endpoints
                        .requestMatchers(HttpMethod.PUT, "/**").permitAll()  // Allow all actuator endpoints
                        .requestMatchers(HttpMethod.PATCH, "/**").permitAll()  // Allow all actuator endpoints
                        .anyRequest().authenticated()

                )
        ;
        return http.build();
    }
}
