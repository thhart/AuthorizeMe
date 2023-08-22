package com.itth.authorize.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.rest.core.annotation.RestResource;

import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Role implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @UuidGenerator
    private String id;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column
    private String name;

    @OrderBy(value = "name")
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @RestResource(exported = false)
    private Set<Permission> permissions;
}
