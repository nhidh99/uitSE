package org.example.service.impl;

import org.example.dao.AddressRepository;
import org.example.model.Address;
import org.example.service.api.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AddressServiceImpl implements AddressService {
    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<Address> findByUsername(String username) {
        return addressRepository.findByUserUsername(username);
    }
}
