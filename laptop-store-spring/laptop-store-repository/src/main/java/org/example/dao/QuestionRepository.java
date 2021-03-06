package org.example.dao;

import org.example.model.Question;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByApproveStatusTrueAndLaptopId(Integer laptopId, Pageable pageable);

    List<Question> findByApproveStatusIs(Boolean approveStatus, Pageable pageable);

    Long countByApproveStatusTrueAndUserUsername(String username);

    long countByApproveStatusIs(Boolean approveStatus);

    long countByApproveStatusTrueAndLaptopId(Integer productId);
}
