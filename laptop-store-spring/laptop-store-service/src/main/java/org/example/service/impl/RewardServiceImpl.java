package org.example.service.impl;

import org.example.dao.RewardRepository;
import org.example.model.Reward;
import org.example.service.api.RewardService;
import org.example.type.RewardType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RewardServiceImpl implements RewardService {
    @Autowired
    private RewardRepository rewardRepository;

    @Override
    public Reward findById(RewardType id) {
        return rewardRepository.getOne(id);
    }
}