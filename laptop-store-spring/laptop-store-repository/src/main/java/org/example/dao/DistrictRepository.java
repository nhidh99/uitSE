package org.example.dao;

import org.example.constant.CacheConstants;
import org.example.model.City;
import org.example.model.District;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer> {

    @Cacheable(value = CacheConstants.DISTRICT, key = "#id")
    District getOne(Integer id);

    @Cacheable(value = CacheConstants.DISTRICTS, key = "'city:' + #cityId")
    List<District> findByCityId(Integer cityId);

    boolean existsByIdAndCityId(Integer id, Integer cityId);
}
