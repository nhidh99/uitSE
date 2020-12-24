package org.example.service.impl.creator;

import org.example.dao.*;
import org.example.input.form.AddressInput;
import org.example.model.*;
import org.example.service.api.creator.AddressCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressCreatorImpl implements AddressCreator {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final CityRepository cityRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;

    @Autowired
    public AddressCreatorImpl(AddressRepository addressRepository, UserRepository userRepository,
                              CityRepository cityRepository, DistrictRepository districtRepository,
                              WardRepository wardRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.cityRepository = cityRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
    }

    @Override
    public List<Address> createUserAddressesStartWithDefault(String username) {
        User user = userRepository.findByUsername(username);
        List<Address> addresses = addressRepository.findByUserUsernameAndRecordStatusTrueOrderByIdDesc(username);
        Address defaultAddressInList = findUserDefaultAddressInList(user, addresses);
        return defaultAddressInList == null ? addresses : createUserAddressesStartWithDefault(addresses, defaultAddressInList);
    }

    private Address findUserDefaultAddressInList(User user, List<Address> addresses) {
        if (user.getDefaultAddressId() == null || addresses.isEmpty()) return null;
        return addresses.stream().filter(address -> address.isUserDefaultAddress(user)).findFirst().orElse(null);
    }

    private List<Address> createUserAddressesStartWithDefault(List<Address> source, Address defaultAddress) {
        source.remove(defaultAddress);
        source.add(0, defaultAddress);
        return source;
    }

    @Override
    public Address createUserAddress(AddressInput addressInput) {
        City city = cityRepository.getOne(addressInput.getCityId());
        District district = districtRepository.getOne(addressInput.getDistrictId());
        Ward ward = wardRepository.getOne(addressInput.getWardId());
        User user = userRepository.findByUsername(addressInput.getUsername());
        return Address.builder()
                .receiverName(addressInput.getReceiverName())
                .receiverPhone(addressInput.getReceiverPhone())
                .city(city).district(district).ward(ward)
                .street(addressInput.getStreet())
                .addressNum(addressInput.getAddressNum())
                .user(user).recordStatus(true).build();
    }
}
