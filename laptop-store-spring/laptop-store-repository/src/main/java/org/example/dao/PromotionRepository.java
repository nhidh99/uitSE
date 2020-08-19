package org.example.dao;

import org.example.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    List<Promotion> findByRecordStatusTrueAndLaptopsId(Integer laptopId);

    @Query("SELECT p.image FROM Promotion p WHERE p.id = :id")
    byte[] findImageById(@Param("id") Integer id);
}
