package org.example.dao;

import org.example.model.District;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Integer> {
    boolean existsByIdAndCityId(Integer id, Integer cityId);

    District findByName(String name);

    List<District> findByCityId(Integer cityId);
}
