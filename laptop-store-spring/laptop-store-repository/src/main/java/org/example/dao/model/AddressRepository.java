package org.example.dao.model;

import org.example.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    List<Address> findByUserUsernameAndRecordStatusTrueOrderByIdDesc(String username);

    boolean existsByIdAndUserUsernameAndRecordStatusTrue(Integer addressId, String username);
}
