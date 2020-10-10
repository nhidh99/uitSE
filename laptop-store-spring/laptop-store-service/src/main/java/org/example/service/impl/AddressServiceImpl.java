package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.model.*;
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
    public List<AddressOverviewDTO> findOverviewsByUsername(String username) {
        return txTemplate.execute((status) -> {
            User user = userRepository.findByUsername(username);
            List<Address> addresses = addressRepository.findByUserUsernameAndRecordStatusTrueOrderByIdDesc(username);
            Integer defaultAddressId = user.getDefaultAddressId();
            if (defaultAddressId != null) {
                Address defaultAddress = addresses.stream()
                        .filter(address -> address.getId().equals(defaultAddressId))
                        .findFirst().orElseThrow(IllegalArgumentException::new);
                addresses.remove(defaultAddress);
                addresses.add(0, defaultAddress);
            }

            return addresses.stream().map((address) -> {
                AddressOverviewDTO addressOverviewDTO = ModelMapperUtil.map(address, AddressOverviewDTO.class);
                String location = address.getAddressNum().concat(" ").concat(
                        String.join(", ",
                                address.getStreet(),
                                address.getWardName(),
                                address.getDistrictName(),
                                address.getCityName()
                        ));
                addressOverviewDTO.setLocation(location);
                return addressOverviewDTO;
            }).collect(Collectors.toList());
        });
    }

    @Override
    public AddressDetailDTO findDetailByIdAndUsername(Integer addressId, String username) {
        return txTemplate.execute((status) -> {
            boolean isValidRequest = addressRepository.existsByIdAndUserUsernameAndRecordStatusTrue(addressId, username);
            if (!isValidRequest) throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
            Address address = addressRepository.getOne(addressId);
            return ModelMapperUtil.map(address, AddressDetailDTO.class);
        });
    }

    @Override
    public Integer createAddress(AddressInput addressInput, String username) {
        return txTemplate.execute((status) -> {
            boolean isValidInput = locationService.validateLocation(addressInput);
            if (!isValidInput) throw new IllegalArgumentException(ErrorMessageConstants.INVALID_LOCATION_IDS);
            City city = cityRepository.getOne(addressInput.getCityId());
            District district = districtRepository.getOne(addressInput.getDistrictId());
            Ward ward = wardRepository.getOne(addressInput.getWardId());
            User user = userRepository.findByUsername(username);
            Address address = Address.builder()
                    .receiverName(addressInput.getReceiverName())
                    .receiverPhone(addressInput.getReceiverPhone())
                    .city(city).district(district).ward(ward)
                    .street(addressInput.getStreet())
                    .addressNum(addressInput.getAddressNum())
                    .user(user).recordStatus(true).build();
            return addressRepository.saveAndFlush(address).getId();
        });
    }

    @Override
    public void deleteAddress(Integer addressId, String username) {
        txTemplate.executeWithoutResult((status) -> {
            boolean isValidRequest = addressRepository.existsByIdAndUserUsernameAndRecordStatusTrue(addressId, username);
            if (!isValidRequest) throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
            Address address = addressRepository.getOne(addressId);
            address.setRecordStatus(false);

            // If the deleted address is user default address
            User user = userRepository.findByUsername(username);
            if (user.getDefaultAddressId().equals(addressId)) {
                user.setDefaultAddressId(null);
            }
        });
    }

    @Override
    public void updateAddress(Integer addressId, AddressInput addressInput, String username) {
        txTemplate.executeWithoutResult((status) -> {
            boolean isValidRequest = addressRepository.existsByIdAndUserUsernameAndRecordStatusTrue(addressId, username);
            if (!isValidRequest) throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);

            boolean isValidInput = locationService.validateLocation(addressInput);
            if (!isValidInput) throw new IllegalArgumentException(ErrorMessageConstants.INVALID_LOCATION_IDS);

            Address address = addressRepository.getOne(addressId);
            ModelMapperUtil.map(addressInput, address);
        });
    }
}