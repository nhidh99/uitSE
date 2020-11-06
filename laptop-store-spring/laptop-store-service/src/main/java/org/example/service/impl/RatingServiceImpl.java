package org.example.service.impl;

import org.example.constant.PaginateConstants;
import org.example.dao.RatingRepository;
import org.example.dto.rating.RatingDTO;
import org.example.model.Rating;
import org.example.service.api.RatingService;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository,
                             PlatformTransactionManager txManager) {
        this.ratingRepository = ratingRepository;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public Pair<List<RatingDTO>, Long> findByLaptopId(Integer laptopId, int page) {
        Pageable pageable = PageRequest.of(page - 1,
                PaginateConstants.RATING_PER_USER_PAGE,
                Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            List<Rating> ratings = ratingRepository.findByApproveStatusTrueAndLaptopId(laptopId, pageable);
            long ratingCount = ratingRepository.countByApproveStatusTrueAndLaptopId(laptopId);
            return Pair.of(ModelMapperUtil.mapList(ratings, RatingDTO.class), ratingCount);
        });
    }
}
