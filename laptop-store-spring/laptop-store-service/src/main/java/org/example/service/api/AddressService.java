package org.example.service.api;

import org.example.dto.address.AddressDetailDTO;
import org.example.dto.address.AddressOverviewDTO;
import org.example.input.form.AddressInput;

import java.util.List;

public interface AddressService {

    List<AddressOverviewDTO> findUserAddressOverviews(String username);

    AddressDetailDTO findUserAddressDetail(Integer addressId, String username);

    Integer insertUserAddress(AddressInput addressInput);

    void deleteUserAddress(Integer addressId, String username);

    void updateUserAddress(AddressInput addressInput);
}