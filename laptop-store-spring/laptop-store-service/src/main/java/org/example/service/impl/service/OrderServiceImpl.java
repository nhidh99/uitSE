package org.example.service.impl.service;

import org.example.dao.OrderRepository;
import org.example.dto.order.OrderDetailDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.dto.order.OrderSummaryDTO;
import org.example.input.query.OrderSearchInput;
import org.example.model.Order;
import org.example.service.api.checker.AddressChecker;
import org.example.service.api.checker.OrderChecker;
import org.example.service.api.creator.OrderCreator;
import org.example.service.api.service.OrderService;
import org.example.service.util.PageableUtil;
import org.example.type.OrderStatus;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private static final int SIZE_PER_PAGE = 5;
    private final OrderRepository orderRepository;
    private final AddressChecker addressChecker;
    private final OrderChecker orderChecker;
    private final OrderCreator orderCreator;
    private final TransactionTemplate txTemplate;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, AddressChecker addressChecker,
                            OrderChecker orderChecker, OrderCreator orderCreator, PlatformTransactionManager txManager) {
        this.orderRepository = orderRepository;
        this.addressChecker = addressChecker;
        this.orderChecker = orderChecker;
        this.orderCreator = orderCreator;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public Pair<List<OrderOverviewDTO>, Long> findUserOrdersByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return txTemplate.execute((status) -> {
            List<Order> orders = orderRepository.findByUserUsername(username, pageable);
            long orderCount = orderRepository.countByUserUsername(username);
            return Pair.of(ModelMapperUtil.mapList(orders, OrderOverviewDTO.class), orderCount);
        });
    }

    @Override
    public OrderDetailDTO findUserOrderDetailByOrderId(Integer orderId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return txTemplate.execute((status) -> {
            orderChecker.checkExistedUserOrder(username, orderId);
            Order order = orderRepository.getOne(orderId);
            return ModelMapperUtil.map(order, OrderDetailDTO.class);
        });
    }

    @Override
    public Integer insertUserOrder(Integer addressId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return txTemplate.execute((status) -> {
            addressChecker.checkExistedUserAddress(username, addressId);
            Order order = orderCreator.createUserOrderWithAddress(username, addressId);
            return orderRepository.saveAndFlush(order).getId();
        });
    }

    @Override
    public void cancelOrderByIdAndUsername(Integer orderId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        txTemplate.executeWithoutResult((status) -> {
            orderChecker.checkExistedUserOrder(username, orderId);
            Order order = orderRepository.getOne(orderId);
            order.setStatus(OrderStatus.CANCELED);
            order.addTrack(OrderStatus.CANCELED);
        });
    }

    @Override
    public Pair<List<OrderSummaryDTO>, Long> findOrdersBySearch(OrderSearchInput search) {
        Pageable pageable = PageableUtil.createPageableFromSearch(search);
        boolean isEmptyQuery = search.getQuery().isEmpty();
        return txTemplate.execute((txStatus) -> {
            Pair<List<Order>, Long> ordersAndCount = isEmptyQuery
                    ? findAndCountOrdersBySearchWithoutQueryParam(search, pageable)
                    : findAndCountOrdersBySearchWithQueryParam(search, pageable);
            return ModelMapperUtil.mapFirstOfPair(ordersAndCount, OrderSummaryDTO.class);
        });
    }

    private Pair<List<Order>, Long> findAndCountOrdersBySearchWithQueryParam(
            OrderSearchInput search, Pageable pageable) {
        String query = search.getQuery();
        OrderStatus status = search.getStatus();
        List<Order> orders = orderRepository.findByQueryAndStatus(query, status, pageable);
        long count = orderRepository.countByQueryAndStatus(query, status);
        return Pair.of(orders, count);
    }

    private Pair<List<Order>, Long> findAndCountOrdersBySearchWithoutQueryParam(
            OrderSearchInput search, Pageable pageable) {
        OrderStatus status = search.getStatus();
        List<Order> orders = orderRepository.findByStatus(status, pageable);
        long count = orderRepository.countByStatus(status);
        return Pair.of(orders, count);
    }
}