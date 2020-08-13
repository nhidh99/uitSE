package org.example.service.api;

import org.example.model.Address;

import java.util.List;

public interface AddressService {
    List<Address> findByUsername(String username);
}
