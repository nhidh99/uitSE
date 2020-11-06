package org.example.service.api;

import org.example.dto.rating.RatingDTO;
import org.example.util.Pair;

import java.util.List;

public interface RatingService {
    Pair<List<RatingDTO>, Long> findByLaptopId(Integer laptopId, int page);
}
