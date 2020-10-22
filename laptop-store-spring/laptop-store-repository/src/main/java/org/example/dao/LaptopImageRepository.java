package org.example.dao;

import org.example.model.LaptopImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LaptopImageRepository extends JpaRepository<LaptopImage, Integer> {
    @Query("SELECT i.largeImage FROM LaptopImage i WHERE i.id = :id")
    byte[] findLargeImageById(@Param("id") Integer id);

    @Query("SELECT i.image FROM LaptopImage i WHERE i.id = :id")
    byte[] findImageById(@Param("id") Integer id);

    @Query("SELECT i.thumbnail FROM LaptopImage i WHERE i.id = :id")
    byte[] findThumbnailById(@Param("id") Integer id);
}
