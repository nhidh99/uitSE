package org.example.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.RewardLevelType;
import org.example.type.RewardType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserReward {
    @JsonProperty("type")
    private RewardType type;

    @JsonProperty("level")
    private RewardLevelType level;

    @JsonProperty("cur_value")
    private Number curValue;

    @JsonProperty("reward")
    private Reward reward;
}
