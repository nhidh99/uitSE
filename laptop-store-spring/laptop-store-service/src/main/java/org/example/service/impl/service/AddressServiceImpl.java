package org.example.service.impl.service;

import org.example.dao.AddressRepository;
import org.example.dao.UserRepository;
import org.example.dto.address.AddressDetailDTO;
import org.example.dto.address.AddressOverviewDTO;
import org.example.input.form.AddressInput;
import org.example.model.Address;
import org.example.model.User;
import org.example.service.api.checker.AddressChecker;
import org.example.service.api.creator.AddressCreator;
import org.example.service.api.service.AddressService;
import org.example.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final AddressChecker addressChecker;
    private final AddressCreator addressCreator;
    private final TransactionTemplate txTemplate;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository, UserRepository userRepository,
                              AddressChecker addressChecker, AddressCreator addressCreator,
                              PlatformTransactionManager txManager) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.addressChecker = addressChecker;
        this.addressCreator = addressCreator;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public List<AddressOverviewDTO> findUserAddresses(String username) {
        return txTemplate.execute((status) -> {
            List<Address> addresses = addressCreator.createUserAddressesStartWithDefault(username);
            return ModelMapperUtil.mapList(addresses, AddressOverviewDTO.class);
        });
    }

    @Override
    public AddressDetailDTO findUserAddressDetail(Integer addressId, String username) {
        return txTemplate.execute((status) -> {
            addressChecker.checkExistedUserAddress(username, addressId);
            Address address = addressRepository.getOne(addressId);
            return ModelMapperUtil.map(address, AddressDetailDTO.class);
        });
    }

    @Override
    public Integer insertUserAddress(AddressInput addressInput) {
        return txTemplate.execute((status) -> {
            Integer cityId = addressInput.getCityId();
            Integer districtId = addressInput.getDistrictId();
            Integer wardId = addressInput.getWardId();
            addressChecker.checkExistedAddressLocation(cityId, districtId, wardId);
            Address address = addressCreator.createUserAddress(addressInput);
            return addressRepository.saveAndFlush(address).getId();
        });
    }

    @Override
    public void deleteUserAddress(Integer addressId, String username) {
        txTemplate.executeWithoutResult((status) -> {
            addressChecker.checkExistedUserAddress(username, addressId);
            deleteAddress(addressId);
            deleteUserDefaultAddress(username, addressId);
        });
    }

    private void deleteAddress(Integer addressId) {
        Address address = addressRepository.getOne(addressId);
        address.setRecordStatus(false);
    }

    private void deleteUserDefaultAddress(String username, Integer addressId) {
        User user = userRepository.findByUsername(username);
        boolean isUserDefaultAddressId = addressId.equals(user.getDefaultAddressId());
        if (isUserDefaultAddressId) {
            user.setDefaultAddressId(null);
        }
    }

    @Override
    public void updateUserAddress(AddressInput addressInput) {
        txTemplate.executeWithoutResult((status) -> {
            addressChecker.checkAddressInput(addressInput);
            Integer addressId = addressInput.getAddressId();
            Address newAddress = addressCreator.createUserAddress(addressInput);
            Address curAddress = addressRepository.getOne(addressId);
            ModelMapperUtil.map(newAddress, curAddress);
        });
    }
}