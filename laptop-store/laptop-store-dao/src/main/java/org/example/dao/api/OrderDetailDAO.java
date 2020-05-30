package org.example.dao.api;

import org.example.model.OrderDetail;


import java.util.List;

public interface OrderDetailDAO {
    List<OrderDetail> findByOrderId(Integer orderId);
}
