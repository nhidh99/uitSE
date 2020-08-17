package org.example.dao;

import org.example.model.Laptop;
import org.example.projection.LaptopBlockData;
import org.example.projection.LaptopRowData;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LaptopRepository extends JpaRepository<Laptop, Integer> {
    List<LaptopRowData> findRowDataByRecordStatusTrue(Pageable pageable);

    List<LaptopBlockData> findBlockDataByRecordStatusTrueAndIdIn(List<Integer> ids);

    List<LaptopRowData> findRowDataByRecordStatusTrueAndIdIn(List<Integer> ids);

    @Query("SELECT l.id AS id, l.alt AS alt, l.quantity AS quantity, l.name AS name, l.ram AS ram, l.hardDrive " +
            "AS hardDrive, l.avgRating as avgRating, l.unitPrice as unitPrice, l.discountPrice AS discountPrice " +
            "FROM Laptop l LEFT JOIN OrderDetail d ON d.productId = l.id " +
            "LEFT JOIN Order o ON o.id = d.order.id " +
            "WHERE l.recordStatus = true " +
            "AND ((o.status = 'DELIVERED' AND d.productType = 'LAPTOP') " +
            "OR l.id NOT IN (SELECT DISTINCT d2.productId FROM OrderDetail d2 WHERE d2.productType = 'LAPTOP')) " +
            "GROUP BY l.id ORDER BY SUM(d.quantity) DESC")
    List<LaptopRowData> findBestSelling(Pageable pageable);

    @Query("SELECT l.largeImage FROM Laptop l WHERE l.id = :id")
    byte[] findLargeImageById(@Param("id") Integer id);

    @Query("SELECT l.image FROM Laptop l WHERE l.id = :id")
    byte[] findImageById(@Param("id") Integer id);

    @Query("SELECT l.thumbnail FROM Laptop l WHERE l.id = :id")
    byte[] findThumbnailById(@Param("id") Integer id);

    @Query(value = "CALL laptop_suggest(:id, 5)", nativeQuery = true)
    List<Integer> findSuggestionIdsById(@Param("id") Integer id);
}