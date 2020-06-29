package org.example.dao.api;

import org.example.model.Reward;
import org.example.type.RewardType;

public interface RewardDAO {
    Reward findByType(RewardType rewardType);
}
