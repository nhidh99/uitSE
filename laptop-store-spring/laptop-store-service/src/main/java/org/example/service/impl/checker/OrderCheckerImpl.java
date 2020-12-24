package org.example.service.impl.checker;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.OrderRepository;
import org.example.service.api.checker.OrderChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderCheckerImpl implements OrderChecker {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderCheckerImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public void checkExistedUserOrder(String username, Integer orderId) {
        boolean isExistedUserOrder = orderRepository.existsByIdAndUserUsername(orderId, username);
        if (!isExistedUserOrder) {
            throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
        }
    }
}
