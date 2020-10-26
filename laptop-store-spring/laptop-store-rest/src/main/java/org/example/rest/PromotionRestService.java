package org.example.rest;

import org.example.constant.HeaderConstants;
import org.example.dto.promotion.PromotionSummaryDTO;
import org.example.input.SearchInput;
import org.example.service.api.PromotionService;
import org.example.type.SearchOrderType;
import org.example.type.SearchTagetType;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/promotions")
@PreAuthorize("permitAll()")
public class PromotionRestService {

    private final PromotionService promotionService;

    @Autowired
    public PromotionRestService(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @PreAuthorize("hasAuthority(T(org.example.type.RoleType).ADMIN)")
    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPromotionsByPage(
            @RequestParam(value = "query", defaultValue = "") String query,
            @RequestParam(value = "target", defaultValue = "ID") SearchTagetType target,
            @RequestParam(value = "order", defaultValue = "DESC") SearchOrderType order,
            @RequestParam(value = "page", defaultValue = "1") Integer page) {

        SearchInput search = SearchInput.builder().query(query).target(target).order(order).page(page).build();
        Pair<List<PromotionSummaryDTO>, Long> laptopsAndCount = promotionService.findBySearch(search);
        return ResponseEntity.ok()
                .header(HeaderConstants.TOTAL_COUNT, laptopsAndCount.getSecond().toString())
                .body(laptopsAndCount.getFirst());
    }
}
