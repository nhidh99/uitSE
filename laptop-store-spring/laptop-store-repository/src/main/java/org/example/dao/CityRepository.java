package org.example.dao;

import org.example.constant.CacheConstants;
import org.example.model.City;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
    @Cacheable(value = CacheConstants.CITIES, key = "'all'")
    List<City> findAll();

    @Cacheable(value = CacheConstants.CITY, key = "#id")
    City getOne(Integer id);

    boolean existsById(Integer id);
}