package org.example.dao.api;

import org.example.model.Rating;


import java.util.List;
import java.util.Optional;

public interface RatingDAO {
    void save(Rating rating);

    Optional<Rating> findById(Integer id);

    List<Rating> findByProductId(Integer laptopId);

    Float findAvgRatingByProductId(Integer laptopId);
}
