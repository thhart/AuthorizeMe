package com.itth.authorize.model;

import jakarta.persistence.*;
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
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Role implements Serializable {
    @Id
    @UuidGenerator
    private String id;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column
    private String name; // e.g., "USER", "ADMIN"

    @OneToMany(fetch = FetchType.EAGER)
    private Set<Permission> permissions;

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
