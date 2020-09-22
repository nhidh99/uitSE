package org.example.dao.model;

import org.example.model.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserUsername(String username, Pageable pageable);

    Long countByUserUsername(String username);

    boolean existsByIdAndUserUsername(Integer id, String username);
}
