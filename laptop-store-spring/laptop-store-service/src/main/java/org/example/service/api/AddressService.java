package org.example.service.api;

import org.example.dto.AddressDetailDTO;
import org.example.dto.AddressOverviewDTO;
import org.example.input.AddressInput;

import java.util.List;

public interface AddressService {
    boolean existsByIdAndUsername(Integer id, String username);

    List<AddressOverviewDTO> findOverviewsByUsername(String username);

    AddressDetailDTO findDetailByIdAndUsername(Integer addressId, String username);

    Integer createAddress(AddressInput addressInput, String username);

    void deleteAddress(Integer addressId, String username);

    void updateAddress(Integer addressId, AddressInput addressInput, String username);
}