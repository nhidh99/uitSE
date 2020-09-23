package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.model.*;
import org.example.dto.address.AddressDetailDTO;
import org.example.dto.address.AddressOverviewDTO;
import org.example.input.AddressInput;
import org.example.model.Address;
import org.example.model.User;
import org.example.service.api.AddressService;
import org.example.service.api.LocationService;
import org.example.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final LocationService locationService;
    private final TransactionTemplate txTemplate;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository,
                              UserRepository userRepository,
                              LocationService locationService,
                              PlatformTransactionManager txManager) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.locationService = locationService;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public boolean existsByIdAndUsername(Integer id, String username) {
        return addressRepository.existsByIdAndUserUsername(id, username);
    }

    @Override
    public List<AddressOverviewDTO> findOverviewsByUsername(String username) {
        return txTemplate.execute((status) -> {
            List<Address> addresses = addressRepository.findByUserUsernameAndRecordStatusTrueOrderByIdDesc(username);
            return addresses.stream().map((address) -> {
                AddressOverviewDTO addressOverviewDTO = ModelMapperUtil.map(address, AddressOverviewDTO.class);
                String location = address.getAddressNum()
                        .concat(" ").concat(String.join(", ",
                        address.getStreet(), address.getWardName(),
                        address.getDistrictName(), address.getCityName()
                ));
                addressOverviewDTO.setLocation(location);
                return addressOverviewDTO;
            }).collect(Collectors.toList());
        });
    }

    @Override
    public AddressDetailDTO findDetailByIdAndUsername(Integer addressId, String username) {
        return txTemplate.execute((status)-> {
            boolean isValidRequest = addressRepository.existsByIdAndUserUsername(addressId, username);
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
            Address address = ModelMapperUtil.map(addressInput, Address.class);
            User user = userRepository.findByUsername(username);
            address.setUser(user);
            address.setRecordStatus(true);
            return addressRepository.saveAndFlush(address).getId();
        });
    }

    @Override
    public void deleteAddress(Integer addressId, String username) {
        txTemplate.executeWithoutResult((status) -> {
            boolean isValidRequest = addressRepository.existsByIdAndUserUsername(addressId, username);
            if (!isValidRequest) throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
            Address address = addressRepository.getOne(addressId);
            address.setRecordStatus(false);
        });
    }

    @Override
    public void updateAddress(Integer addressId, AddressInput addressInput, String username) {
        txTemplate.executeWithoutResult((status) -> {
            boolean isValidRequest = addressRepository.existsByIdAndUserUsername(addressId, username);
            if (!isValidRequest) throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);

            boolean isValidInput = locationService.validateLocation(addressInput);
            if (!isValidInput) throw new IllegalArgumentException(ErrorMessageConstants.INVALID_LOCATION_IDS);

            Address address = addressRepository.getOne(addressId);
            ModelMapperUtil.map(addressInput, address);
        });
    }
}