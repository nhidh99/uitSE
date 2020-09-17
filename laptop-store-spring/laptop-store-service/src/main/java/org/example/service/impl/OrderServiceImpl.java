package org.example.service.impl;

import org.example.dao.dto.OrderOverviewDTORepository;
import org.example.dao.model.OrderRepository;
import org.example.dto.OrderOverviewDTO;
import org.example.model.Order;
import org.example.model.OrderDetail;
import org.example.service.api.OrderService;
import org.example.type.ProductType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private static final int SIZE_PER_PAGE = 5;
    private final OrderRepository orderRepository;
    private final OrderOverviewDTORepository orderOverviewDTORepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderOverviewDTORepository orderOverviewDTORepository,
                            PlatformTransactionManager txManager) {
        this.orderRepository = orderRepository;
        this.orderOverviewDTORepository = orderOverviewDTORepository;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public boolean existByIdAndUsername(Integer id, String username) {
        return orderRepository.existsByIdAndUserUsername(id, username);
    }

    @Override
    public Optional<Order> findById(Integer id) {
        return orderRepository.findById(id);
    }

    @Override
    public List<OrderOverviewDTO> findOverviewByUsernameAndPage(String username, int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            return orderOverviewDTORepository.findByUserUsername(username, pageable);
        });
    }

    @Override
    public Long countByUsername(String username) {
        return orderRepository.countByUserUsername(username);
    }
}
