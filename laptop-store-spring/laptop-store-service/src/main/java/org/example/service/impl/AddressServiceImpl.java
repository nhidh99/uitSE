package org.example.service.impl;

import org.example.dao.*;
import org.example.model.Address;
import org.example.model.User;
import org.example.service.api.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private DistrictRepository districtRepository;

    @Autowired
    private WardRepository wardRepository;

    @Override
    public Map<String, Object> findDetailById(Integer addressId) {
        Address address = addressRepository.findById(addressId).orElseThrow(IllegalArgumentException::new);
        Integer cityId = cityRepository.findIdByName(address.getCity());
        Integer districtId = districtRepository.findIdByNameAndCityId(address.getDistrict(), cityId);
        Integer wardId = wardRepository.findIdByNameAndDistrictId(address.getWard(), districtId);
        return new HashMap<String, Object>() {{
            put("address", address);
            put("city_id", cityId);
            put("district_id", districtId);
            put("ward_id", wardId);
        }};
    }

    @Override
    public boolean existsByIdAndUsername(Integer id, String username) {
        return addressRepository.existsByIdAndUserUsername(id, username);
    }

    @Override
    public List<Address> findByUsername(String username) {
        return addressRepository.findByUserUsernameAndRecordStatusTrue(username);
    }

    @Override
    public Integer save(Address address) {
        Address savedAddress = addressRepository.save(address);
        return savedAddress.getId();
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {
        Address address = addressRepository.findById(id).get();
        User user = address.getUser();
        if (id.equals(user.getDefaultAddressId())) {
            user.setDefaultAddressId(null);
            userRepository.save(user);
        }
        address.setRecordStatus(false);
        addressRepository.save(address);
    }
}