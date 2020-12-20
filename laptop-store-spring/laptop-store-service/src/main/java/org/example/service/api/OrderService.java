package org.example.service.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.dto.order.OrderDetailDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.dto.order.OrderSummaryDTO;
import org.example.input.query.OrderSearchInput;
import org.example.input.query.ProductSearchInput;
import org.example.model.Order;
import org.example.type.OrderStatus;
import org.example.util.Pair;

import java.util.List;

public interface OrderService {
    Pair<List<OrderOverviewDTO>, Long> findUserOrderOverviewsByPage(String username, int page);

    OrderDetailDTO findUserOrderDetailByOrderId(String username, Integer orderId);

    Integer insertUserOrder(Integer addressId, String username) throws JsonProcessingException;

    void cancelOrderByIdAndUsername(String username, Integer orderId);

    Pair<List<OrderSummaryDTO>, Long> findOrderSummariesBySearch(OrderSearchInput search);
}
