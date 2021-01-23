package org.example.service.api.service;

import org.example.dto.address.AddressDetailDTO;
import org.example.dto.address.AddressOverviewDTO;
import org.example.input.form.AddressInput;

import java.util.List;

public interface AddressService {
    List<AddressOverviewDTO> findUserAddresses();

    AddressDetailDTO findUserAddressDetail(Integer addressId);

    Integer insertUserAddress(AddressInput addressInput);

    void deleteUserAddress(Integer addressId);

    void updateUserAddress(AddressInput addressInput);
}