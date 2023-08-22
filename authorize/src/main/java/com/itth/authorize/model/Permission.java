package com.itth.authorize.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.io.Serializable;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Permission implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @UuidGenerator
    private String id;

    @NotBlank
    @Size(min = 3, max = 64)
    private String name; // e.g., "READ_POST", "EDIT_USER"

    @Size(max = 256)
    private String description = "";
}
