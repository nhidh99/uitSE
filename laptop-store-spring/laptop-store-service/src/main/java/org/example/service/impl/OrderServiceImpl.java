package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.constant.ErrorMessageConstants;
import org.example.dao.AddressRepository;
import org.example.dao.OrderRepository;
import org.example.dto.order.OrderDetailDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.dto.order.OrderSummaryDTO;
import org.example.helper.api.OrderHelper;
import org.example.input.query.OrderSearchInput;
import org.example.model.Order;
import org.example.service.api.OrderService;
import org.example.service.util.PageableUtil;
import org.example.type.OrderStatus;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private static final int SIZE_PER_PAGE = 5;

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final OrderHelper orderHelper;
    private final TransactionTemplate txTemplate;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, AddressRepository addressRepository,
                            OrderHelper orderHelper, PlatformTransactionManager txManager) {
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
        this.orderHelper = orderHelper;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public Pair<List<OrderOverviewDTO>, Long> findUserOrderOverviewsByPage(String username, int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            List<Order> orders = orderRepository.findByUserUsername(username, pageable);
            long orderCount = orderRepository.countByUserUsername(username);
            return Pair.of(ModelMapperUtil.mapList(orders, OrderOverviewDTO.class), orderCount);
        });
    }

    @Override
    public OrderDetailDTO findUserOrderDetailByOrderId(String username, Integer orderId) {
        return txTemplate.execute((status) -> {
            checkFindOrderDetailAuthority(username, orderId);
            Order order = orderRepository.getOne(orderId);
            return ModelMapperUtil.map(order, OrderDetailDTO.class);
        });
    }

    private void checkFindOrderDetailAuthority(String username, Integer orderId) {
        boolean isValidRequest = orderRepository.existsByIdAndUserUsername(orderId, username);
        if (!isValidRequest) {
            throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
        }
    }

    @Override
    public Integer insertUserOrder(Integer addressId, String username) throws JsonProcessingException {
        return txTemplate.execute((status) -> {
            checkDeliveryAddressId(addressId, username);
            Order order = orderHelper.createUserOrderWithAddress(username, addressId);
            return orderRepository.saveAndFlush(order).getId();
        });
    }

    private void checkDeliveryAddressId(Integer addressId, String username) {
        boolean isValidAddress = addressRepository.existsByIdAndUserUsernameAndRecordStatusTrue(addressId, username);
        if (!isValidAddress) {
            throw new IllegalArgumentException(ErrorMessageConstants.INVALID_DELIVERY_ADDRESS);
        }
    }

    @Override
    public void cancelOrderByIdAndUsername(String username, Integer orderId) {
        txTemplate.executeWithoutResult((status) -> {
            checkCancelOrderAuthority(username, orderId);
            cancelOrder(orderId);
        });
    }

    private void cancelOrder(Integer orderId) {
        Order order = orderRepository.getOne(orderId);
        order.setStatus(OrderStatus.CANCELED);
        order.addTrack(OrderStatus.CANCELED);
    }

    private void checkCancelOrderAuthority(String username, Integer orderId) {
        boolean isValidRequest = orderRepository.existsByIdAndUserUsername(orderId, username);
        if (!isValidRequest) {
            throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
        }
    }

    @Override
    public Pair<List<OrderSummaryDTO>, Long> findOrderSummariesBySearch(OrderSearchInput search) {
        Pageable pageable = PageableUtil.createPageableFromSearch(search);
        boolean isEmptyQuery = search.getQuery().isEmpty();
        return txTemplate.execute((txStatus) -> {
            Pair<List<Order>, Long> ordersAndCount = isEmptyQuery
                    ? findAndCountOrdersByOrderSearchWithoutQueryParam(search, pageable)
                    : findAndCountOrdersByOrderSearchWithQueryParam(search, pageable);
            return ModelMapperUtil.mapFirstOfPair(ordersAndCount, OrderSummaryDTO.class);
        });
    }

    private Pair<List<Order>, Long> findAndCountOrdersByOrderSearchWithQueryParam(
            OrderSearchInput search, Pageable pageable) {
        String query = search.getQuery();
        OrderStatus status = search.getStatus();
        List<Order> orders = orderRepository.findByQueryAndStatus(query, status, pageable);
        long count = orderRepository.countByQueryAndStatus(query, status);
        return Pair.of(orders, count);
    }

    private Pair<List<Order>, Long> findAndCountOrdersByOrderSearchWithoutQueryParam(
            OrderSearchInput search, Pageable pageable) {
        OrderStatus status = search.getStatus();
        List<Order> orders = orderRepository.findByStatus(status, pageable);
        long count = orderRepository.countByStatus(status);
        return Pair.of(orders, count);
    }
}