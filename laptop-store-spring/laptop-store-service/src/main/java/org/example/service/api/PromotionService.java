package org.example.service.api;

import org.example.dto.promotion.PromotionSummaryDTO;
import org.example.input.query.ProductSearchInput;
import org.example.input.query.SearchInput;
import org.example.util.Pair;

import java.util.List;

public interface PromotionService {

    byte[] findPromotionImageById(Integer id);

    Pair<List<PromotionSummaryDTO>, Long> findAndCountPromotionSummariesBySearch(SearchInput search);
}
