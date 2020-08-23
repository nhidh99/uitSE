package org.example.dao;

import org.example.model.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WardRepository extends JpaRepository<Ward, Integer> {
    boolean existsByIdAndDistrictId(Integer id, Integer districtId);

    Ward findByName(String name);

    List<Ward> findByDistrictId(Integer districtId);
}
