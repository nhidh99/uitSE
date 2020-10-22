package org.example.service.impl;

import org.example.dao.OrderDetailRepository;
import org.example.model.OrderItem;
import org.example.service.api.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderItem> findByOrderId(Integer orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }
}
