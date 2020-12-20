package org.example.dao;

import org.example.model.Promotion;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    @Query("SELECT new Promotion(p.id, p.name, p.price, p.quantity, p.alt) " +
            "FROM Promotion p JOIN p.laptops l WHERE p.recordStatus = true AND l.id = :laptopId")
    List<Promotion> findByRecordStatusTrueAndLaptopsId(@Param("laptopId") Integer laptopId);

    @Query("SELECT new Promotion(p.id, p.name, p.price, p.quantity, p.alt) " +
            "FROM Promotion p WHERE p.id IN :promotionIds")
    List<Promotion> findByRecordStatusTrueAndIdIn(@Param("promotionIds") Set<Integer> promotionIds);

    @Query("SELECT new Promotion(p.id, p.name, p.price, p.quantity, p.alt) " +
            "FROM Promotion p WHERE p.recordStatus = true " +
            "AND (TRIM(p.id) = :query OR p.name LIKE %:query%)")
    List<Promotion> findByRecordStatusTrueAndNameContainingOrIdEquals(@Param("query") String query, Pageable pageable);

    @Query("SELECT new Promotion(p.id, p.name, p.price, p.quantity, p.alt) " +
            "FROM Promotion p WHERE p.recordStatus = true")
    List<Promotion> findByRecordStatusTrue(Pageable pageable);

    long countByRecordStatusTrue();

    @Query("SELECT COUNT(p) FROM Promotion p " +
            "WHERE p.recordStatus = true " +
            "AND (TRIM(p.id) = :query OR p.name LIKE %:query%)")
    long countByRecordStatusTrueAndNameContainingOrIdEquals(@Param("query") String query);

    @Query("SELECT p.image FROM Promotion p WHERE p.id = :id")
    byte[] findImageById(@Param("id") Integer id);
}