package org.example.service.impl.checker;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.AddressRepository;
import org.example.dao.CityRepository;
import org.example.dao.DistrictRepository;
import org.example.dao.WardRepository;
import org.example.input.form.AddressInput;
import org.example.service.api.checker.AddressChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AddressCheckerImpl implements AddressChecker {
    private final AddressRepository addressRepository;
    private final CityRepository cityRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;

    @Autowired
    public AddressCheckerImpl(AddressRepository addressRepository, CityRepository cityRepository,
                              DistrictRepository districtRepository, WardRepository wardRepository) {
        this.addressRepository = addressRepository;
        this.cityRepository = cityRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
    }


    @Override
    public void checkExistedUserAddress(String username, Integer addressId) {
        boolean isExistedUserAddress = addressRepository.existsByIdAndUserUsernameAndRecordStatusTrue(addressId, username);
        if (!isExistedUserAddress) {
            throw new IllegalArgumentException(ErrorMessageConstants.INVALID_ADDRESS);
        }
    }

    @Override
    public void checkAddressInput(AddressInput addressInput) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Integer addressId = addressInput.getAddressId();
        Integer cityId = addressInput.getCityId();
        Integer districtId = addressInput.getDistrictId();
        Integer wardId = addressInput.getWardId();
        checkExistedUserAddress(username, addressId);
        checkExistedAddressLocation(cityId, districtId, wardId);
    }

    @Override
    public void checkExistedAddressLocation(Integer cityId, Integer districtId, Integer wardId) {
        boolean isValidCity = cityRepository.existsById(cityId);
        boolean isValidDistrict = districtRepository.existsByIdAndCityId(districtId, cityId);
        boolean isValidWard = wardRepository.existsByIdAndDistrictId(wardId, districtId);
        boolean isValidLocation = isValidCity && isValidDistrict && isValidWard;
        if (!isValidLocation) {
            throw new IllegalArgumentException(ErrorMessageConstants.INVALID_LOCATION_IDS);
        }
    }
}
