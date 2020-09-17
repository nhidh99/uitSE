package org.example.dao.model;

import org.example.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    List<Address> findByUserUsernameAndRecordStatusTrue(String username);

    boolean existsByIdAndUserUsername(Integer id, String username);
}
