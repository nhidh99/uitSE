package org.example.service.impl;

import org.example.dao.OrderRepository;
import org.example.model.Order;
import org.example.projection.OrderRowData;
import org.example.service.api.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderServiceImpl implements OrderService {
    private static final int SIZE_PER_PAGE = 5;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<OrderRowData> findRowDataByUsernameAndPage(String username, int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return orderRepository.findByUserUsername(username, pageable);
    }

    @Override
    public Long countByUsername(String username) {
        return orderRepository.countByUserUsername(username);
    }
}
