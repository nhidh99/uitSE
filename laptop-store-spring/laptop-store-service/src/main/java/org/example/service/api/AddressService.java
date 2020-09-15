package org.example.service.api;

import org.example.model.Address;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface AddressService {
    boolean existsByIdAndUsername(Integer id, String username);

    List<Address> findByUsername(String username);

    Integer save(Address address);

    void deleteById(Integer addressId);

    Map<String, Object> findDetailById(Integer addressId);
}
