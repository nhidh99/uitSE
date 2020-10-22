package org.example.dao;

import org.example.model.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WardRepository extends JpaRepository<Ward, Integer> {
    boolean existsByIdAndDistrictId(Integer id, Integer districtId);

    @Query("SELECT w.id FROM Ward w WHERE w.name = :name AND w.districtId = :districtId")
    Integer findIdByNameAndDistrictId(@Param("name") String name, @Param("districtId") Integer districtId);

    List<Ward> findByDistrictId(Integer districtId);
}
