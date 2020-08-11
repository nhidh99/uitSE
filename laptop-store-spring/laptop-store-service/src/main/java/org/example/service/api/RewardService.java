package org.example.service.api;

import org.example.model.Reward;
import org.example.type.RewardType;

public interface RewardService {
    Reward findById(RewardType id);
}
