package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "district")
public class District {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Column(name = "city_id")
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    private Integer cityId;
}
