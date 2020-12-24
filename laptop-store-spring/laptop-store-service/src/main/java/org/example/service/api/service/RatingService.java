package org.example.service.api.service;

import org.example.dto.rating.RatingDTO;
import org.example.dto.rating.RatingSummaryDTO;
import org.example.input.form.RatingInput;
import org.example.type.FeedbackStatus;
import org.example.util.Pair;

import java.util.List;

public interface RatingService {
    Pair<List<RatingDTO>, Long> findByLaptopId(Integer laptopId, int page);

    Pair<List<RatingSummaryDTO>, Long> findAndCountRatingSummariesByStatus(FeedbackStatus status, int page);

    void insertRating(RatingInput ratingInput);
}
