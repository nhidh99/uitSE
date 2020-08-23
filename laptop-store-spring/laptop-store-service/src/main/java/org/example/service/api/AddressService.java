package org.example.service.api;

import org.example.model.Address;

import java.util.List;
import java.util.Optional;

public interface AddressService {
    Optional<Address> findById(Integer id);

    boolean existsByIdAndUsername(Integer id, String username);

    List<Address> findByUsername(String username);

    Integer save(Address address);

    void deleteById(Integer addressId);
}
