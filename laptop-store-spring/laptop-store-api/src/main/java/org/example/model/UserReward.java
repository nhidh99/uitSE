package org.example.model;

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
public class UserReward {
    @JsonProperty("type")
    private MilestoneType type;

    @JsonProperty("level")
    private MilestoneLevelType level;

    @JsonProperty("cur_value")
    private Number curValue;

    @JsonProperty("reward")
    private Milestone milestone;
}
