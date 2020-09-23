package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.model.OrderRepository;
import org.example.dto.order.OrderDetailDTO;
import org.example.dto.order.OrderItemDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.model.Order;
import org.example.service.api.OrderService;
import org.example.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private static final int SIZE_PER_PAGE = 5;
    private final OrderRepository orderRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            PlatformTransactionManager txManager) {
        this.orderRepository = orderRepository;
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
            List<Order> orders = orderRepository.findByUserUsername(username, pageable);
            return ModelMapperUtil.mapList(orders, OrderOverviewDTO.class);
        });
    }

    @Override
    public Long countByUsername(String username) {
        return orderRepository.countByUserUsername(username);
    }

    @Override
    public OrderDetailDTO findOrderDTOByOrderIdAndUsername(Integer orderId, String username) {
        return txTemplate.execute((status) -> {
            boolean isInvalidRequest = !orderRepository.existsByIdAndUserUsername(orderId, username);
            if (isInvalidRequest) throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);

            Order order = orderRepository.getOne(orderId);
            List<OrderItemDTO> items = ModelMapperUtil.mapList(order.getOrderItems(), OrderItemDTO.class);
            String location = order.getAddressNum().concat(" ").concat(String.join(", ",
                    order.getStreet(), order.getWard(), order.getDistrict(), order.getCity()));

            OrderDetailDTO orderDetailDTO = ModelMapperUtil.map(order, OrderDetailDTO.class);
            orderDetailDTO.setOrderLocation(location);
            orderDetailDTO.setItems(items);
            return orderDetailDTO;
        });
    }
}
