package org.example.dao;

import org.example.constant.CacheConstants;
import org.example.model.District;
import org.example.model.Ward;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WardRepository extends JpaRepository<Ward, Integer> {
    @Cacheable(value = CacheConstants.WARD, key = "#id")
    Ward getOne(Integer id);

    @Cacheable(value = CacheConstants.WARDS, key = "'district:' + #districtId")
    List<Ward> findByDistrictId(Integer districtId);

    boolean existsByIdAndDistrictId(Integer id, Integer districtId);
}
