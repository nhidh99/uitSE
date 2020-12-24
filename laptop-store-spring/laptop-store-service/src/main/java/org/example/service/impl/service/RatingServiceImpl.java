package org.example.service.impl.service;

import org.example.constant.CacheConstants;
import org.example.constant.PaginateConstants;
import org.example.dao.RatingRepository;
import org.example.dto.rating.RatingDTO;
import org.example.dto.rating.RatingSummaryDTO;
import org.example.input.form.RatingInput;
import org.example.model.Rating;
import org.example.service.api.checker.LaptopChecker;
import org.example.service.api.creator.RatingCreator;
import org.example.service.api.service.RatingService;
import org.example.type.FeedbackStatus;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
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
    private final LaptopChecker laptopChecker;
    private final RatingCreator ratingCreator;
    private final TransactionTemplate txTemplate;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository, LaptopChecker laptopChecker,
                             RatingCreator ratingCreator, PlatformTransactionManager txManager) {
        this.ratingRepository = ratingRepository;
        this.ratingCreator = ratingCreator;
        this.laptopChecker = laptopChecker;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    @Cacheable(value = CacheConstants.RATINGS, key = "'laptop-id:' + #laptopId + ':page:' + #page")
    public Pair<List<RatingDTO>, Long> findByLaptopId(Integer laptopId, int page) {
        Pageable pageable = PageRequest.of(page - 1, PaginateConstants.RATING_PER_USER_PAGE, Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            List<Rating> ratings = ratingRepository.findByApproveStatusTrueAndLaptopId(laptopId, pageable);
            long ratingCount = ratingRepository.countByApproveStatusTrueAndLaptopId(laptopId);
            return Pair.of(ModelMapperUtil.mapList(ratings, RatingDTO.class), ratingCount);
        });
    }

    @Override
    public Pair<List<RatingSummaryDTO>, Long> findAndCountRatingSummariesByStatus(FeedbackStatus status, int page) {
        Pageable pageable = PageRequest.of(page - 1, PaginateConstants.SIZE_PER_ADMIN_PAGE, Sort.by("id").descending());
        return txTemplate.execute((txStatus) -> {
            List<Rating> ratings = ratingRepository.findByApproveStatus(status.getApproveStatus(), pageable);
            long ratingCount = ratingRepository.countByApproveStatus(status.getApproveStatus());
            return Pair.of(ModelMapperUtil.mapList(ratings, RatingSummaryDTO.class), ratingCount);
        });
    }

    @Override
    public void insertRating(RatingInput ratingInput) {
        txTemplate.executeWithoutResult((status) -> {
            Integer laptopId = ratingInput.getProductId();
            laptopChecker.checkExistedLaptop(laptopId);
            Rating rating = ratingCreator.createRating(ratingInput);
            ratingRepository.save(rating);
        });
    }
}
