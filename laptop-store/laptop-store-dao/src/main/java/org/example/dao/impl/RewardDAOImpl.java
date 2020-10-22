package org.example.dao.impl;

import org.example.dao.api.RewardDAO;
import org.example.model.Reward;
import org.example.type.RewardType;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class RewardDAOImpl implements RewardDAO {

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    public Reward findByType(RewardType rewardType) {
        return em.find(Reward.class, rewardType);
    }
}
