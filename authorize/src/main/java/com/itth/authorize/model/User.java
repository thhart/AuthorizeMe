package com.itth.authorize.model;

import com.google.common.base.Objects;
import com.itth.authorize.service.listener.ModelListener;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.ArrayUtils;
import org.hibernate.annotations.UuidGenerator;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;
import java.util.stream.IntStream;

@Entity
@Data
@Table(name = "person")
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(ModelListener.class)
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    @Version
    private Timestamp version;

    @NotBlank
    @Size(min = 2, max = 100)
    @Column
    private String password;

    @OrderBy(value = "name")
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<Role> roles;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equal(id, user.id) && Objects.equal(login, user.login) && Objects.equal(email, user.email) && Objects.equal(password, user.password) && Objects.equal(roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id, login, email, password) + (roles == null ? 0 : IntStream.of(ArrayUtils.toPrimitive(roles.stream().map(Role::hashCode).toArray(Integer[]::new))).sum());
    }
}
