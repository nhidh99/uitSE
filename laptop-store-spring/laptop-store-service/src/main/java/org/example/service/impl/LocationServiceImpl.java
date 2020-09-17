package org.example.service.impl;

import org.example.dao.model.CityRepository;
import org.example.dao.model.DistrictRepository;
import org.example.dao.model.WardRepository;
import org.example.model.City;
import org.example.model.District;
import org.example.model.Ward;
import org.example.service.api.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationServiceImpl implements LocationService {
    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private DistrictRepository districtRepository;

    @Autowired
    private WardRepository wardRepository;

    @Override
    public Optional<City> findCityById(Integer id) {
        return cityRepository.findById(id);
    }

    @Override
    public Optional<District> findDistrictById(Integer id) {
        return districtRepository.findById(id);
    }

    @Override
    public Optional<Ward> findWardById(Integer id) {
        return wardRepository.findById(id);
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
    public boolean validateLocation(Integer cityId, Integer districtId, Integer wardId) {
        boolean isValidCity = cityRepository.existsById(cityId);
        boolean isValidDistrict = districtRepository.existsByIdAndCityId(districtId, cityId);
        boolean isValidWard = wardRepository.existsByIdAndDistrictId(wardId, districtId);
        return isValidCity && isValidDistrict && isValidWard;
    }
}
