package org.example.service.api;

import org.example.dto.promotion.PromotionSummaryDTO;
import org.example.input.SearchInput;
import org.example.model.Promotion;
import org.example.util.Pair;

import java.util.List;

public interface PromotionService {

    byte[] findImageById(Integer id);

    Pair<List<PromotionSummaryDTO>, Long> findBySearch(SearchInput search);
}
