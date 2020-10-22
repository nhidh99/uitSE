package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;
import org.example.type.LaptopTagType;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "laptop_tag")
public class LaptopTag {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laptop_id")
    @JsonIgnore
    private Laptop laptop;

    @Column(name = "tag")
    @JsonProperty("tag")
    @Enumerated(EnumType.STRING)
    private LaptopTagType tag;
}