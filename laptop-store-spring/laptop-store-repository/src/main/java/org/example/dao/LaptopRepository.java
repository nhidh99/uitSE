package org.example.dao;

import org.example.model.Laptop;
import org.example.type.ImageType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LaptopRepository extends JpaRepository<Laptop, Integer> {
    List<Laptop> findByRecordStatusTrue(Pageable pageable);

    @Query("SELECT l FROM Laptop l LEFT JOIN OrderDetail d ON d.productId = l.id " +
            "LEFT JOIN Order o ON o.id = d.order.id " +
            "WHERE l.recordStatus = true " +
            "AND ((o.status = 'DELIVERED' AND d.productType = 'LAPTOP') " +
            "OR l.id NOT IN (SELECT DISTINCT d2.productId FROM OrderDetail d2 WHERE d2.productType = 'LAPTOP')) " +
            "GROUP BY l.id ORDER BY SUM(d.quantity) DESC")
    List<Laptop> findBestSelling(Pageable pageable);

    default byte[] findImageById(Integer id, ImageType type) {
        Optional<Laptop> optLaptop = findById(id);
        if (!optLaptop.isPresent()) return null;
        Laptop laptop = optLaptop.get();
        switch (type) {
            case LAPTOP_LARGE_IMAGE:
                return laptop.getLargeImage();
            case LAPTOP_IMAGE:
                return laptop.getImage();
            case LAPTOP_THUMBNAIL:
                return laptop.getThumbnail();
            default:
                return null;
        }
    }
}
