package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "reward")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reward {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Column(name = "description")
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    private String description;

    @Column(name = "bronze_value")
    @JsonProperty("bronze_value")
    private Long bronzeValue;

    @Column(name = "silver_value")
    @JsonProperty("silver_value")
    private Long silverValue;

    @Column(name = "gold_value")
    @JsonProperty("gold_value")
    private Long goldValue;
}
