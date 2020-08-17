package org.example.dao;

import org.example.model.Order;
import org.example.projection.OrderRowData;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<OrderRowData> findByUserUsername(String username, Pageable pageable);

    Long countByUserUsername(String username);
}
