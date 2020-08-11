package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.type.RewardType;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "reward")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Reward {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @Enumerated(EnumType.STRING)
    private RewardType id;

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
