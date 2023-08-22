package com.itth.authorize;

import com.itth.authorize.model.Permission;
import com.itth.authorize.model.Role;
import com.itth.authorize.model.User;
import com.itth.authorize.repository.RoleRepository;
import com.itth.authorize.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@SpringBootApplication
@Log4j2
public class AuthorizeApplication {

	public static final String SECURITY_FLAW = "************* SECURITY FLAW ************* ";

	public static void main(String[] args) {
		SpringApplication.run(AuthorizeApplication.class, args);
	}

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Bean
	    public CommandLineRunner setupDefaultUser(UserRepository userRepository, RoleRepository roleRepository) {
	        return args -> {
	            Optional<User> user = userRepository.findByLogin("admin");
	            if (user.isEmpty()) {
					try {
						User defaultUser = new User();
						defaultUser.setLogin("admin");
						defaultUser.setEmail("joe@gmail.com");
						defaultUser.setPassword(passwordEncoder.encode("admin")); // Consider encoding this password
						defaultUser.setRoles(new HashSet<>());
						userRepository.save(defaultUser);
						log.warn(SECURITY_FLAW + "created default user: admin");
					} catch (Exception e) {
						log.error(e, e);
					}
				}
				final Iterable<Role> roles = roleRepository.findAll();
				final List<Role> roleList = StreamSupport.stream(Spliterators.spliteratorUnknownSize(roles.iterator(), Spliterator.ORDERED), false)
				                                         .collect(Collectors.toList());
				if(roleList.isEmpty()) {
					try {
						Role defaultRole = new Role();
						defaultRole.setName("ADMIN");
						Permission p1 = new Permission();
						p1.setName("USER");
						Permission p2 = new Permission();
						p2.setName("ADMIN");
						defaultRole.setPermissions(new HashSet<>(List.of(p1, p2)));
						roleList.add(defaultRole);
						roleRepository.save(defaultRole);
						log.warn(SECURITY_FLAW + "created default role: ADMIN");
					} catch (Exception e) {
						log.error(e, e);
					}
				}
				if(user.isPresent() && user.get().getRoles().isEmpty() && !roleList.isEmpty()) {
					try {
						user.get().getRoles().addAll(roleList);
						userRepository.save(user.get());
						log.warn(SECURITY_FLAW + "updated roles for user: admin");
					} catch (Exception e) {
						log.error(e, e);
					}
				}
			};
	    }
}
