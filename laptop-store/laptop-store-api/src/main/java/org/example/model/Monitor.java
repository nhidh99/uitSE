package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.CardDesignType;
import org.example.type.ResolutionType;

import javax.persistence.*;

@Data
@Entity
@Table(name = "monitor")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Monitor {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "size")
    @JsonProperty("size")
    private Float size;

    @Column(name = "resolution_type")
    @JsonProperty("resolution_type")
    @Enumerated(EnumType.STRING)
    private ResolutionType resolutionType;

    @Column(name = "resolution_width")
    @JsonProperty("resolution_width")
    private Integer resolutionWidth;

    @Column(name = "resolution_height")
    @JsonProperty("resolution_height")
    private Integer resolutionHeight;

    @Column(name = "technology")
    @JsonProperty("technology")
    private String technology;

    @Column(name = "card_design")
    @JsonProperty("card_design")
    @Enumerated(EnumType.STRING)
    private CardDesignType cardDesign;

    @Column(name = "graphics_card")
    @JsonProperty("graphics_card")
    private String graphicsCard;
}