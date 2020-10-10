package org.example.service.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.dto.order.OrderDetailDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.model.Order;

import java.util.List;

public interface OrderService {
    List<OrderOverviewDTO> findOverviewByUsernameAndPage(String username, int page);

    OrderDetailDTO findOrderDTOByOrderIdAndUsername(Integer orderId, String username);

    Long countByUsername(String username);

    Order createOrder(Integer addressId, String username) throws JsonProcessingException;
}
