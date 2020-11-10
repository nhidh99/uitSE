package org.example.dto.spec;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.type.ResolutionType;

import java.io.Serializable;

@Data
public class MonitorDTO implements Serializable {
    @JsonProperty("size")
    private Float size;

    @JsonProperty("resolution_type")
    private ResolutionType resolutionType;

    @JsonProperty("resolution_width")
    private Integer resolutionWidth;

    @JsonProperty("resolution_height")
    private Integer resolutionHeight;

    @JsonProperty("technology")
    private String technology;

    @JsonProperty("card_design")
    private String cardDesign;

    @JsonProperty("graphics_card")
    private String graphicsCard;
}
