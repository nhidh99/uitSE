package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "ward")
public class Ward {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Column(name = "district_id")
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    private Integer districtId;

    @OneToMany(mappedBy = "ward")
    @JsonIgnore
    private List<Address> addresses;
}
