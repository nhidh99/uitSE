package org.example.service.api;

import org.example.model.City;
import org.example.model.District;
import org.example.model.Ward;

import java.util.List;
import java.util.Optional;

public interface LocationService {
    Optional<City> findCityById(Integer id);

    Optional<District> findDistrictById(Integer id);

    Optional<Ward> findWardById(Integer id);

    City findCityByName(String name);

    District findDistrictByName(String name);

    Ward findWardByName(String name);

    List<City> findCities();

    List<District> findDistrictsByCityId(Integer cityId);

    List<Ward> findByWardsByDistrictId(Integer districtId);

    boolean validateLocation(Integer cityId, Integer districtId, Integer wardId);
}
