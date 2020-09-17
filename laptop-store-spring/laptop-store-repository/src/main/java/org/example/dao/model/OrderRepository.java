package org.example.dao.model;

import org.example.model.Order;
import org.example.projection.OrderRowData;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Long countByUserUsername(String username);

    boolean existsByIdAndUserUsername(Integer id, String username);
}
