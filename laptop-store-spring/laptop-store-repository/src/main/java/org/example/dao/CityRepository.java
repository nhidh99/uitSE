package org.example.dao;

import org.example.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CityRepository extends JpaRepository<City, Integer> {
    boolean existsById(Integer id);

    @Query("SELECT c.id FROM City c WHERE c.name = :name")
    Integer findIdByName(@Param("name") String name);
}
