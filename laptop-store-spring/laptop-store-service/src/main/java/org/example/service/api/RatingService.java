package org.example.service.api;

import org.example.model.Rating;

import java.util.List;

public interface RatingService {
    List<Rating> findByLaptopId(Integer laptopId, int page);
}
