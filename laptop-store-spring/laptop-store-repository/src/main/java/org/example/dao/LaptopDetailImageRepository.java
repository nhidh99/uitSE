package org.example.dao;

import org.example.model.LaptopDetailImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LaptopDetailImageRepository extends JpaRepository<LaptopDetailImage, Integer> {
    @Query("SELECT i.id FROM LaptopDetailImage i WHERE i.laptop.id = :laptopId")
    List<Integer> findIdsByLaptopId(@Param("laptopId") Integer laptopId);

    @Query("SELECT i.largeImage FROM LaptopDetailImage i WHERE i.id = :id")
    byte[] findLargeImageById(@Param("id") Integer id);

    @Query("SELECT i.image FROM LaptopDetailImage i WHERE i.id = :id")
    byte[] findImageById(@Param("id") Integer id);

    @Query("SELECT i.thumbnail FROM LaptopDetailImage i WHERE i.id = :id")
    byte[] findThumbnailById(@Param("id") Integer id);
}
