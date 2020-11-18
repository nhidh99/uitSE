package org.example.dao;

import org.example.dao.custom.CustomRatingRepository;
import org.example.model.Rating;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer>, CustomRatingRepository {
    List<Rating> findByApproveStatusTrueAndLaptopId(Integer laptopId, Pageable pageable);

    Long countByApproveStatusTrueAndUserUsername(String username);

    long countByApproveStatusTrueAndLaptopId(Integer laptopId);

    List<Rating> findByApproveStatus(Boolean approveStatus, Pageable pageable);

    long countByApproveStatus(Boolean approveStatus);
}
