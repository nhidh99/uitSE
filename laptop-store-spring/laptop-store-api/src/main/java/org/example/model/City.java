package org.example.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "city")
public class City {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;
}
