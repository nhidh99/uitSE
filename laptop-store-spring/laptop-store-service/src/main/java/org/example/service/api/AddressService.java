package org.example.service.api;

import org.example.dto.address.AddressDetailDTO;
import org.example.dto.address.AddressOverviewDTO;
import org.example.input.AddressInput;

import java.util.List;

public interface AddressService {

    List<AddressOverviewDTO> findUserAddressOverviews(String username);

    AddressDetailDTO findUserAddressDetail(Integer addressId, String username);

    Integer createAddress(AddressInput addressInput);

    void deleteAddress(Integer addressId, String username);

    void updateAddress(AddressInput addressInput);
}