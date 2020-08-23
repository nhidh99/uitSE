package org.example.dao;

import org.example.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Integer> {
    boolean existsById(Integer id);

    City findByName(String name);
}
