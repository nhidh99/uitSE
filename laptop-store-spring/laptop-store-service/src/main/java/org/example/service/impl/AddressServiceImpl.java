package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.*;
import org.example.dto.address.AddressDetailDTO;
import org.example.dto.address.AddressOverviewDTO;
import org.example.input.AddressInput;
import org.example.model.*;
import org.example.service.api.AddressService;
import org.example.service.api.LocationService;
import org.example.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final LocationService locationService;
    private final CityRepository cityRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository,
                              UserRepository userRepository,
                              LocationService locationService,
                              CityRepository cityRepository,
                              DistrictRepository districtRepository,
                              WardRepository wardRepository,
                              PlatformTransactionManager txManager) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.locationService = locationService;
        this.cityRepository = cityRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public List<AddressOverviewDTO> findUserAddressOverviews(String username) {
        return txTemplate.execute((status) -> {
            List<Address> addresses = findUserAddressesStartWithDefaultIfOneExisted(username);
            return ModelMapperUtil.mapList(addresses, AddressOverviewDTO.class);
        });
    }

    private List<Address> findUserAddressesStartWithDefaultIfOneExisted(String username) {
        User user = userRepository.findByUsername(username);
        List<Address> addresses = addressRepository.findByUserUsernameAndRecordStatusTrueOrderByIdDesc(username);
        Address defaultAddressInList = findUserDefaultAddressInList(user, addresses);
        return defaultAddressInList == null ? addresses : buildUserAddressesStartWithDefault(addresses, defaultAddressInList);
    }

    private Address findUserDefaultAddressInList(User user, List<Address> addresses) {
        Integer userDefaultAddressId = user.getDefaultAddressId();
        if (userDefaultAddressId == null || addresses.isEmpty()) return null;
        return addresses.stream().filter(address -> address.getId().equals(userDefaultAddressId)).findFirst().orElse(null);
    }

    private List<Address> buildUserAddressesStartWithDefault(List<Address> source, Address defaultAddress) {
        source.remove(defaultAddress);
        source.add(0, defaultAddress);
        return source;
    }

    @Override
    public AddressDetailDTO findUserAddressDetail(Integer addressId, String username) {
        return txTemplate.execute((status) -> {
            checkRequestAuthority(username, addressId);
            Address address = addressRepository.getOne(addressId);
            return ModelMapperUtil.map(address, AddressDetailDTO.class);
        });
    }

    @Override
    public Integer createAddress(AddressInput addressInput) {
        return txTemplate.execute((status) -> {
            checkAddressInputLocation(addressInput);
            return buildUserAddress(addressInput);
        });
    }

    private Integer buildUserAddress(AddressInput addressInput) {
        City city = cityRepository.getOne(addressInput.getCityId());
        District district = districtRepository.getOne(addressInput.getDistrictId());
        Ward ward = wardRepository.getOne(addressInput.getWardId());
        User user = userRepository.findByUsername(addressInput.getUsername());
        Address address = Address.builder()
                .receiverName(addressInput.getReceiverName())
                .receiverPhone(addressInput.getReceiverPhone())
                .city(city).district(district).ward(ward)
                .street(addressInput.getStreet())
                .addressNum(addressInput.getAddressNum())
                .user(user).recordStatus(true).build();
        return addressRepository.saveAndFlush(address).getId();
    }

    @Override
    public void deleteAddress(Integer addressId, String username) {
        txTemplate.executeWithoutResult((status) -> {
            checkRequestAuthority(username, addressId);
            Address address = addressRepository.getOne(addressId);
            address.setRecordStatus(false);
            deleteUserDefaultAddressIfMatched(username, address);
        });
    }

    private void deleteUserDefaultAddressIfMatched(String username, Address deletedAddress) {
        User user = userRepository.findByUsername(username);
        if (deletedAddress.isUserDefaultAddress(user)) {
            user.setDefaultAddressId(null);
        }
    }

    @Override
    public void updateAddress(AddressInput addressInput) {
        txTemplate.executeWithoutResult((status) -> {
            checkRequestAuthority(addressInput);
            checkAddressInputLocation(addressInput);
            Integer addressId = addressInput.getAddressId();
            Address address = addressRepository.getOne(addressId);
            ModelMapperUtil.map(addressInput, address);
        });
    }

    private void checkRequestAuthority(AddressInput addressInput) {
        Integer addressId = addressInput.getAddressId();
        String username = addressInput.getUsername();
        checkRequestAuthority(username, addressId);
    }

    private void checkRequestAuthority(String username, Integer addressId) {
        boolean isValidRecord = addressRepository.existsByIdAndUserUsernameAndRecordStatusTrue(addressId, username);
        if (!isValidRecord) throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
    }

    private void checkAddressInputLocation(AddressInput addressInput) {
        Integer cityId = addressInput.getCityId();
        Integer districtId = addressInput.getDistrictId();
        Integer wardId = addressInput.getWardId();
        boolean isValidInput = locationService.validateLocation(cityId, districtId, wardId);
        if (!isValidInput) throw new IllegalArgumentException(ErrorMessageConstants.INVALID_LOCATION_IDS);
    }
}