package org.example.dao;

import org.example.dao.custom.FilterLaptopRepository;
import org.example.model.Laptop;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop, Integer>, FilterLaptopRepository {
    boolean existsByIdAndRecordStatusTrue(int id);

    @Query("SELECT l FROM Laptop l " +
            "WHERE l.recordStatus = true " +
            "AND (l.id = :query OR l.name LIKE '%:query%')")
    List<Laptop> findByRecordStatusTrueAndNameContainingOrIdEquals(@Param("query") String query, Pageable pageable);

    List<Laptop> findByRecordStatusTrue(Pageable pageable);

    List<Laptop> findByRecordStatusTrueAndIdIn(@Param("ids") List<Integer> ids);

    List<Laptop> findByRecordStatusTrueAndIdIn(@Param("ids") Set<Integer> ids);

    @Query("SELECT l FROM Laptop l " +
            "LEFT JOIN OrderItem i ON i.productId = l.id " +
            "LEFT JOIN i.order as o " +
            "WHERE l.recordStatus = true " +
            "AND ((o.status = 'DELIVERED' AND i.productType = 'LAPTOP') " +
            "OR l.id NOT IN (SELECT DISTINCT i2.productId FROM OrderItem i2 WHERE i2.productType = 'LAPTOP')) " +
            "GROUP BY l.id ORDER BY SUM(i.quantity) DESC")
    List<Laptop> findBestSelling(Pageable pageable);

    @Query(value = "CALL laptop_suggest(:id, 5)", nativeQuery = true)
    List<Integer> findSuggestionIdsById(@Param("id") Integer id);

    long countByRecordStatusTrue();

    long countByNameContainingIgnoreCaseAndRecordStatusTrue(String name);

    @Query("SELECT COUNT(l) FROM Laptop l " +
            "WHERE l.recordStatus = true " +
            "AND (l.id = :query OR l.name LIKE '%:query%')")
    long countByRecordStatusTrueAndNameContainingOrIdEquals(@Param("query") String query);
}