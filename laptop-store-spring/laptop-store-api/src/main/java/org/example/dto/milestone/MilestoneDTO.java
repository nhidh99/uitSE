package org.example.dto.milestone;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.MilestoneLevelType;
import org.example.type.MilestoneType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneDTO {
    @JsonProperty("id")
    private MilestoneType id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("level")
    private MilestoneLevelType level;

    @JsonProperty("target")
    private Long target;

    @JsonProperty("cur_value")
    private Long curValue;
}