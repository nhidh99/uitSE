package org.example.service.impl;

import org.example.dao.AddressRepository;
import org.example.dao.UserRepository;
import org.example.model.Address;
import org.example.model.User;
import org.example.service.api.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<Address> findById(Integer id) {
        return addressRepository.findById(id);
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