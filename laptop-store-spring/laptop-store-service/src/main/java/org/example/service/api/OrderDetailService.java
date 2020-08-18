package org.example.service.api;

import org.example.model.OrderDetail;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetail> findByOrderId(Integer orderId);
}
