package org.example.dao.model;

import org.example.model.Laptop;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop, Integer> {
    boolean existsByIdAndRecordStatusTrue(int id);

    List<Laptop> findByRecordStatusTrue(Pageable pageable);

    List<Laptop> findByRecordStatusTrueAndIdIn(@Param("ids") List<Integer> ids);

    List<Laptop> findByRecordStatusTrueAndIdIn(@Param("ids") Set<Integer> ids);

    @Query("SELECT l FROM Laptop l " +
            "LEFT JOIN OrderItem d ON d.productId = l.id " +
            "LEFT JOIN Order o ON o.id = d.order.id " +
            "WHERE l.recordStatus = true " +
            "AND ((o.status = 'DELIVERED' AND d.productType = 'LAPTOP') " +
            "OR l.id NOT IN (SELECT DISTINCT d2.productId FROM OrderItem d2 WHERE d2.productType = 'LAPTOP')) " +
            "GROUP BY l.id ORDER BY SUM(d.quantity) DESC")
    List<Laptop> findBestSelling(Pageable pageable);

        @Query(value = "CALL laptop_suggest(:id, 5)", nativeQuery = true)
    List<Integer> findSuggestionIdsById(@Param("id") Integer id);
}