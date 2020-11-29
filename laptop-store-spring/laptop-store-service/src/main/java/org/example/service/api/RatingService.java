package org.example.service.api;

import org.example.dto.rating.RatingDTO;
import org.example.dto.rating.RatingSummaryDTO;
import org.example.input.RatingInput;
import org.example.type.FeedbackStatus;
import org.example.util.Pair;

import java.util.List;

public interface RatingService {
    Pair<List<RatingDTO>, Long> findByLaptopId(Integer laptopId, int page);

    Pair<List<RatingSummaryDTO>, Long> findByStatus(FeedbackStatus status, int page);

    void createRating(RatingInput ratingInput, String username);
}
