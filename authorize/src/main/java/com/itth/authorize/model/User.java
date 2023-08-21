package com.itth.authorize.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.io.IOException;
import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@Table(name = "person")
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    @Id
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
    @JsonIgnore
    private String password;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;

    @Serial
    private void writeObject(java.io.ObjectOutputStream stream)
            throws IOException {
        stream.defaultWriteObject();
    }

    @Serial
    private void readObject(java.io.ObjectInputStream stream)
            throws IOException, ClassNotFoundException {
        stream.defaultReadObject();
    }
}
