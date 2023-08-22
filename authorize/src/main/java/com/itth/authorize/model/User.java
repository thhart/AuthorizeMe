package com.itth.authorize.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@Table(name = "person")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode()
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @UuidGenerator
    private String id;

    @NotBlank
    @Size(min = 2, max = 50)
    @Column
    private String login;

    @NotBlank
    @Email
    @Size(max = 100)
    @Column
    private String email;

    @NotBlank
    @Size(min = 2, max = 100)
    @Column
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;
}
