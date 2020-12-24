package org.example.service.impl.service;

import org.example.dao.PromotionRepository;
import org.example.dto.promotion.PromotionSummaryDTO;
import org.example.input.query.SearchInput;
import org.example.model.Promotion;
import org.example.service.api.service.PromotionService;
import org.example.service.util.PageableUtil;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {
    private final PromotionRepository promotionRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public PromotionServiceImpl(PromotionRepository promotionRepository,
                                PlatformTransactionManager txManager) {
        this.promotionRepository = promotionRepository;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public Pair<List<PromotionSummaryDTO>, Long> findAndCountPromotionsBySearch(SearchInput search) {
        Pageable pageable = PageableUtil.createPageableFromSearch(search);
        return txTemplate.execute((status) -> {
            Pair<List<Promotion>, Long> promotionsAndCount = search.isEmptyQuery()
                    ? findAndCountPromotionsBySearchWithoutQueryParam(pageable)
                    : findAndCountPromotionsBySearchWithQueryParam(search, pageable);
            return ModelMapperUtil.mapFirstOfPair(promotionsAndCount, PromotionSummaryDTO.class);
        });
    }

    private Pair<List<Promotion>, Long> findAndCountPromotionsBySearchWithQueryParam(SearchInput search, Pageable pageable) {
        String query = search.getQuery();
        List<Promotion> promotions = promotionRepository.findByRecordStatusTrueAndNameContainingOrIdEquals(query, pageable);
        long count = promotionRepository.countByRecordStatusTrueAndNameContainingOrIdEquals(query);
        return Pair.of(promotions, count);
    }

    private Pair<List<Promotion>, Long> findAndCountPromotionsBySearchWithoutQueryParam(Pageable pageable) {
        List<Promotion> promotions = promotionRepository.findByRecordStatusTrue(pageable);
        long count = promotionRepository.countByRecordStatusTrue();
        return Pair.of(promotions, count);
    }

    @Override
    public byte[] findPromotionImageById(Integer id) {
        return promotionRepository.findImageById(id);
    }
}
