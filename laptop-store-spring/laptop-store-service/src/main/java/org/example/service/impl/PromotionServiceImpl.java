package org.example.service.impl;

import org.example.constant.PaginateConstants;
import org.example.dao.PromotionRepository;
import org.example.dto.promotion.PromotionSummaryDTO;
import org.example.input.SearchInput;
import org.example.model.Promotion;
import org.example.service.api.PromotionService;
import org.example.type.SearchOrderType;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {

    private final PromotionRepository promotionRepository;

    @Autowired
    public PromotionServiceImpl(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    @Override
    public Pair<List<PromotionSummaryDTO>, Long> findBySearch(SearchInput search) {
        Pageable pageable = buildPageableFromSearch(search);
        String query = search.getQuery();

        if (query.isEmpty()) {
            List<Promotion> promotions = promotionRepository.findByRecordStatusTrue(pageable);
            long promotionCount = promotionRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(promotions, PromotionSummaryDTO.class), promotionCount);
        } else {
            List<Promotion> promotions = promotionRepository.findByRecordStatusTrueAndNameContainingOrIdEquals(query, pageable);
            long promotionCount = promotionRepository.countByRecordStatusTrueAndNameContainingOrIdEquals(query);
            return Pair.of(ModelMapperUtil.mapList(promotions, PromotionSummaryDTO.class), promotionCount);
        }
    }

    private Pageable buildPageableFromSearch(SearchInput search) {
        Sort sort = Sort.by(search.getTarget().toString());
        if (search.getOrder().equals(SearchOrderType.DESC)) {
            sort = sort.descending();
        }
        return PageRequest.of(search.getPage() - 1, PaginateConstants.SIZE_PER_ADMIN_PAGE, sort);
    }

    @Override
    public byte[] findImageById(Integer id) {
        return promotionRepository.findImageById(id);
    }
}
