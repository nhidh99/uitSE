package org.example.dao.model;

import org.example.model.Rating;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findByApproveStatusTrueAndLaptopId(Integer laptopId, Pageable pageable);
}
