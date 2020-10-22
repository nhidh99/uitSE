package org.example.service.api;

import org.example.dto.address.AddressDetailDTO;
import org.example.dto.address.AddressOverviewDTO;
import org.example.input.AddressInput;

import java.util.List;

public interface AddressService {

    List<AddressOverviewDTO> findOverviewsByUsername(String username);

    AddressDetailDTO findDetailByIdAndUsername(Integer addressId, String username);

    Integer createAddress(AddressInput addressInput, String username);

    void deleteAddress(Integer addressId, String username);

    void updateAddress(Integer addressId, AddressInput addressInput, String username);
}