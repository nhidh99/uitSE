package org.example.service.api;

import org.example.model.Order;
import org.example.projection.OrderRowData;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    boolean existByIdAndUsername(Integer id, String username);

    Optional<Order> findById(Integer id);

    List<OrderRowData> findRowDataByUsernameAndPage(String username, int page);

    Long countByUsername(String username);
}
