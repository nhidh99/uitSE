package org.example.dao.model;

import org.example.model.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer> {
    boolean existsByIdAndCityId(Integer id, Integer cityId);

    @Query("SELECT d.id FROM District d WHERE d.name = :name AND d.cityId = :cityId")
    Integer findIdByNameAndCityId(@Param("name") String name, @Param("cityId") Integer cityId);

    List<District> findByCityId(Integer cityId);
}
