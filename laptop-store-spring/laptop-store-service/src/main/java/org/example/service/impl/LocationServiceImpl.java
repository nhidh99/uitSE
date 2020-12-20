package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.CityRepository;
import org.example.dao.DistrictRepository;
import org.example.dao.WardRepository;
import org.example.model.City;
import org.example.model.District;
import org.example.model.Ward;
import org.example.service.api.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {
    private final CityRepository cityRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;

    @Autowired
    public LocationServiceImpl(CityRepository cityRepository,
                               DistrictRepository districtRepository,
                               WardRepository wardRepository) {
        this.cityRepository = cityRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
    }

    @Override
    public List<City> findCities() {
        return cityRepository.findAll();
    }

    @Override
    public List<District> findDistrictsByCityId(Integer cityId) {
        return districtRepository.findByCityId(cityId);
    }

    @Override
    public List<Ward> findByWardsByDistrictId(Integer districtId) {
        return wardRepository.findByDistrictId(districtId);
    }

    @Override
    public void checkLocation(Integer cityId, Integer districtId, Integer wardId) {
        boolean isValidCity = cityRepository.existsById(cityId);
        boolean isValidDistrict = districtRepository.existsByIdAndCityId(districtId, cityId);
        boolean isValidWard = wardRepository.existsByIdAndDistrictId(wardId, districtId);
        boolean isValidLocation = isValidCity && isValidDistrict && isValidWard;
        if (!isValidLocation) {
            throw new IllegalArgumentException(ErrorMessageConstants.INVALID_LOCATION_IDS);
        }
    }
}
