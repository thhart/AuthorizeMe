package com.itth.authorize;

import com.itth.authorize.model.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
@Log4j2
public class AuthorizeApplication {
	public static void main(String[] args) {
		SpringApplication.run(AuthorizeApplication.class, args);
	}

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Bean
	    public CommandLineRunner setupDefaultUser(UserRepository userRepository) {
	        return args -> {
	            Optional<User> user = userRepository.findByLogin("admin");
	            if (!user.isPresent()) {
					try {
						User defaultUser = new User();
						defaultUser.setLogin("admin");
						defaultUser.setEmail("joe@gmail.com");
						defaultUser.setPassword(passwordEncoder.encode("admin")); // Consider encoding this password
						userRepository.save(defaultUser);
						log.warn("created default user: admin");
					} catch (Exception e) {
						log.error(e, e);
					}
				}
	        };
	    }
}
