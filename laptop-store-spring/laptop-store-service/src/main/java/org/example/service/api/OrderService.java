package org.example.service.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.dto.order.OrderDetailDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.dto.order.OrderSummaryDTO;
import org.example.input.SearchInput;
import org.example.model.Order;
import org.example.util.Pair;

import java.util.List;

public interface OrderService {
    Pair<List<OrderOverviewDTO>, Long> findOverviewByUsernameAndPage(String username, int page);

    OrderDetailDTO findOrderDTOByOrderIdAndUsername(Integer orderId, String username);

    Order createOrder(Integer addressId, String username) throws JsonProcessingException;

    void cancelOrderByIdAndUsername(Integer orderId, String username);

    Pair<List<OrderSummaryDTO>, Long> findSummaryBySearch(SearchInput search);
}
