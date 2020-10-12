package org.example.service.impl;

import org.example.dao.CityRepository;
import org.example.dao.DistrictRepository;
import org.example.dao.WardRepository;
import org.example.input.AddressInput;
import org.example.model.City;
import org.example.model.District;
import org.example.model.Ward;
import org.example.service.api.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {
    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private DistrictRepository districtRepository;

    @Autowired
    private WardRepository wardRepository;

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
    public boolean validateLocation(AddressInput addressInput) {
        Integer cityId = addressInput.getCityId();
        Integer districtId = addressInput.getDistrictId();
        Integer wardId = addressInput.getWardId();
        boolean isValidCity = cityRepository.existsById(cityId);
        boolean isValidDistrict = districtRepository.existsByIdAndCityId(districtId, cityId);
        boolean isValidWard = wardRepository.existsByIdAndDistrictId(wardId, districtId);
        return isValidCity && isValidDistrict && isValidWard;
    }
}
