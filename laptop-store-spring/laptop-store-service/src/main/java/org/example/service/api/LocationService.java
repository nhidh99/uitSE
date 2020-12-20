package org.example.service.api;

import org.example.model.City;
import org.example.model.District;
import org.example.model.Ward;

import java.util.List;

public interface LocationService {
    List<City> findCities();

    List<District> findDistrictsByCityId(Integer cityId);

    List<Ward> findByWardsByDistrictId(Integer districtId);

    void checkLocation(Integer cityId, Integer districtId, Integer wardId);
}
