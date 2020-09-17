package org.example.dao.model;

import org.example.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    @Query("SELECT new Promotion(p.id, p.name, p.price, p.quantity, p.alt) " +
            "FROM Promotion p JOIN p.laptops l WHERE p.recordStatus = true AND l.id = :laptopId")
    List<Promotion> findByRecordStatusTrueAndLaptopsId(@Param("laptopId") Integer laptopId);

    @Query("SELECT p.image FROM Promotion p WHERE p.id = :id")
    byte[] findImageById(@Param("id") Integer id);
}
