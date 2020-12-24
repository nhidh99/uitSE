package org.example.service.impl.service;

import org.example.dto.milestone.MilestoneDTO;
import org.example.service.api.creator.MilestoneCreator;
import org.example.service.api.service.MilestoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

@Service
public class MilestoneServiceImpl implements MilestoneService {
    private final MilestoneCreator milestoneCreator;
    private final TransactionTemplate txTemplate;

    @Autowired
    public MilestoneServiceImpl(MilestoneCreator milestoneCreator, PlatformTransactionManager txManager) {
        this.milestoneCreator = milestoneCreator;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public List<MilestoneDTO> findUserMilestones(String username) {
        return txTemplate.execute(status -> milestoneCreator.createUserMilestones(username));
    }
}
