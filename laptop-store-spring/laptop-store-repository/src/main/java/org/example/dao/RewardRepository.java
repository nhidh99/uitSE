package org.example.dao;

import org.example.model.Reward;
import org.example.type.RewardType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardRepository extends JpaRepository<Reward, RewardType> {
}
