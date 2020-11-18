package org.example.rest;

import org.example.constant.HeaderConstants;
import org.example.dto.rating.RatingDTO;
import org.example.dto.rating.RatingSummaryDTO;
import org.example.service.api.RatingService;
import org.example.type.FeedbackStatus;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@PreAuthorize("permitAll()")
public class RatingRestService {
    private final RatingService ratingService;

    @Autowired
    public RatingRestService(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, params = "product_id")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getRatingByProductId(@RequestParam("product_id") Integer productId,
                                                  @RequestParam("page") Integer page) {
        Pair<List<RatingDTO>, Long> ratingsAndCount = ratingService.findByLaptopId(productId, page);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HeaderConstants.TOTAL_COUNT, ratingsAndCount.getSecond().toString())
                .body(ratingsAndCount.getFirst());
    }

    @PreAuthorize("hasAuthority(T(org.example.type.RoleType).ADMIN)")
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, params = "status")
    public ResponseEntity<?> getRatingByProductId(@RequestParam("status") FeedbackStatus status,
                                                  @RequestParam("page") Integer page) {
        Pair<List<RatingSummaryDTO>, Long> ratingsAndCount = ratingService.findByStatus(status, page);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HeaderConstants.TOTAL_COUNT, ratingsAndCount.getSecond().toString())
                .body(ratingsAndCount.getFirst());
    }
}