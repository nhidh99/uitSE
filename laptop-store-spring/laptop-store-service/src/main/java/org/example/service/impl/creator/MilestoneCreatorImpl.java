package org.example.service.impl.creator;

import org.example.dao.MilestoneRepository;
import org.example.dao.OrderRepository;
import org.example.dao.QuestionRepository;
import org.example.dao.RatingRepository;
import org.example.dto.milestone.MilestoneDTO;
import org.example.model.Milestone;
import org.example.service.api.creator.MilestoneCreator;
import org.example.type.MilestoneLevelType;
import org.example.type.MilestoneType;
import org.example.type.OrderStatus;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MilestoneCreatorImpl implements MilestoneCreator {
    private final MilestoneRepository milestoneRepository;
    private final OrderRepository orderRepository;
    private final RatingRepository ratingRepository;
    private final QuestionRepository questionRepository;

    @Autowired
    public MilestoneCreatorImpl(MilestoneRepository milestoneRepository, OrderRepository orderRepository,
                                RatingRepository ratingRepository, QuestionRepository questionRepository) {
        this.milestoneRepository = milestoneRepository;
        this.orderRepository = orderRepository;
        this.ratingRepository = ratingRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public List<MilestoneDTO> createUserMilestones(String username) {
        List<Milestone> milestones = milestoneRepository.findAll();
        return milestones.stream().map((milestone) -> {
            Long nullableCurValue = findUserMilestoneValueByType(username, milestone.getId());
            Long curValue = Optional.ofNullable(nullableCurValue).orElse(0L);
            Pair<MilestoneLevelType, Long> levelAndTarget = findUserMilestoneLevelAndTarget(curValue, milestone);
            return createUserMilestone(milestone, curValue, levelAndTarget);
        }).collect(Collectors.toList());
    }
    private MilestoneDTO createUserMilestone(Milestone milestone, Long curValue,
                                             Pair<MilestoneLevelType, Long> levelAndTarget) {
        MilestoneDTO milestoneDTO = ModelMapperUtil.map(milestone, MilestoneDTO.class);
        milestoneDTO.setCurValue(curValue);
        milestoneDTO.setLevel(levelAndTarget.getFirst());
        milestoneDTO.setTarget(levelAndTarget.getSecond());
        return milestoneDTO;
    }

    private Pair<MilestoneLevelType, Long> findUserMilestoneLevelAndTarget(Long curValue, Milestone milestone) {
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

    private Long findUserMilestoneValueByType(String username, MilestoneType type) {
        switch (type) {
            case ORDER:
                return findUserOrderMilestoneValue(username);
            case MONEY:
                return findUserMoneyMilestoneValue(username);
            case PROMOTION:
                return findUserPromotionMilestoneValue(username);
            case RATING:
                return findUserRatingMilestoneValue(username);
            case QUESTION:
                return findUserQuestionMilestoneValue(username);
            default:
                return 0L;
        }
    }

    private Long findUserOrderMilestoneValue(String username) {
        return orderRepository.countByStatusAndUserUsername(OrderStatus.DELIVERED, username);
    }

    private Long findUserMoneyMilestoneValue(String username) {
        return orderRepository.getTotalPriceOfDeliveredOrdersByUsername(username);
    }

    private Long findUserPromotionMilestoneValue(String username) {
        return orderRepository.getTotalDiscountOfDeliveredOrdersByUsername(username);
    }

    private Long findUserRatingMilestoneValue(String username) {
        return ratingRepository.countByApproveStatusTrueAndUserUsername(username);
    }

    private Long findUserQuestionMilestoneValue(String username) {
        return questionRepository.countByApproveStatusTrueAndUserUsername(username);
    }
}
