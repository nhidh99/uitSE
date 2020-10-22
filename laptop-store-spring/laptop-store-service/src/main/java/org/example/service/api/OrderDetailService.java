package org.example.service.api;

import org.example.model.OrderItem;

import java.util.List;

public interface OrderDetailService {
    List<OrderItem> findByOrderId(Integer orderId);
}
