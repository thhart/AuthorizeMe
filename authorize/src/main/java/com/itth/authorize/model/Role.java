package com.itth.authorize.model;

import com.google.common.base.Objects;
import com.itth.authorize.service.listener.ModelListener;
import jakarta.persistence.*;
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
@Table
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(ModelListener.class)
public class Role implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @UuidGenerator
    private String id;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column
    private String name;

    @Version
    private Timestamp version;

    @OrderBy(value = "name")
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Set<Permission> permissions;

    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return Objects.equal(id, role.id) && Objects.equal(name, role.name)
                && Objects.equal(permissions, role.permissions);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id, name)  + (permissions == null ? 0 : IntStream.of(ArrayUtils.toPrimitive(permissions.stream().map(Permission::hashCode).toArray(Integer[]::new))).sum());
    }
}
