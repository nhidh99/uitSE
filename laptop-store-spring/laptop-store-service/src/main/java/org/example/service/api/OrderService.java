package org.example.service.api;

import org.example.dto.order.OrderDetailDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.model.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    boolean existByIdAndUsername(Integer id, String username);

    Optional<Order> findById(Integer id);

    List<OrderOverviewDTO> findOverviewByUsernameAndPage(String username, int page);

    OrderDetailDTO findOrderDTOByOrderIdAndUsername(Integer orderId, String username);

    Long countByUsername(String username);
}
