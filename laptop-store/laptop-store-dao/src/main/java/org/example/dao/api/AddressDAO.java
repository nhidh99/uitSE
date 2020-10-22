package org.example.dao.api;

import org.example.model.Address;


import java.util.List;
import java.util.Optional;

public interface AddressDAO {
    Optional<Address> findById(Integer id);

    List<Address> findByUserId(Integer userId);

    void save(Address address);

    void delete(Integer id);
}
