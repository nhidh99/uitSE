package org.example.service.impl;

import org.example.dao.CommentRepository;
import org.example.dao.MilestoneRepository;
import org.example.dao.OrderRepository;
import org.example.dao.RatingRepository;
import org.example.dto.milestone.MilestoneDTO;
import org.example.model.Milestone;
import org.example.service.api.MilestoneService;
import org.example.type.MilestoneLevelType;
import org.example.type.MilestoneType;
import org.example.type.OrderStatus;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class MilestoneServiceImpl implements MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private final OrderRepository orderRepository;
    private final RatingRepository ratingRepository;
    private final CommentRepository commentRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public MilestoneServiceImpl(MilestoneRepository milestoneRepository, OrderRepository orderRepository,
                                RatingRepository ratingRepository, CommentRepository commentRepository,
                                PlatformTransactionManager txManager) {
        this.milestoneRepository = milestoneRepository;
        this.orderRepository = orderRepository;
        this.ratingRepository = ratingRepository;
        this.commentRepository = commentRepository;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public List<MilestoneDTO> findByUsername(String username) {
        return txTemplate.execute(status -> {
            List<MilestoneDTO> output = new LinkedList<>();
            List<Milestone> milestones = milestoneRepository.findAll();
            for (Milestone milestone : milestones) {
                Long curValue = getMilestoneValueByType(milestone.getId(), username);
                Pair<MilestoneLevelType, Long> levelAndTarget = getMilestoneCurrentLevelAndTarget(curValue, milestone);
                MilestoneDTO milestoneDTO = ModelMapperUtil.map(milestone, MilestoneDTO.class);
                milestoneDTO.setCurValue(curValue);
                milestoneDTO.setLevel(levelAndTarget.getFirst());
                milestoneDTO.setTarget(levelAndTarget.getSecond());
                output.add(milestoneDTO);
            }
            return output;
        });
    }

    private Pair<MilestoneLevelType, Long> getMilestoneCurrentLevelAndTarget(Long curValue, Milestone milestone) {
        if (curValue >= milestone.getGoldValue()) {
            return Pair.of(MilestoneLevelType.GOLD, milestone.getGoldValue());
        } else if (curValue >= milestone.getSilverValue()) {
            return Pair.of(MilestoneLevelType.SILVER, milestone.getGoldValue());
        } else if (curValue >= milestone.getBronzeValue()) {
            return Pair.of(MilestoneLevelType.BRONZE, milestone.getSilverValue());
        } else {
            return Pair.of(MilestoneLevelType.NONE, milestone.getBronzeValue());
        }
    }

    private Long getMilestoneValueByType(MilestoneType type, String username) {
        Long output;
        switch (type) {
            case ORDER:
                output = orderRepository.countByStatusAndUserUsername(OrderStatus.DELIVERED, username);
                break;
            case MONEY:
                output = orderRepository.getTotalPriceOfDeliveredOrdersByUsername(username);
                break;
            case PROMOTION:
                output = orderRepository.getTotalDiscountOfDeliveredOrdersByUsername(username);
                break;
            case RATING:
                output = ratingRepository.countByApproveStatusTrueAndUserUsername(username);
                break;
            case QUESTION:
                output = commentRepository.countByApproveStatusTrueAndUserUsername(username);
                break;
            default:
                return 0L;
        }
        return Optional.ofNullable(output).orElse(0L);
    }
}
