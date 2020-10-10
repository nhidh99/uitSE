package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.constant.ErrorMessageConstants;
import org.example.constant.OrderConstants;
import org.example.dao.model.*;
import org.example.dto.order.OrderDetailDTO;
import org.example.dto.order.OrderItemDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.model.*;
import org.example.service.api.OrderService;
import org.example.type.OrderStatus;
import org.example.type.ProductType;
import org.example.util.DateUtil;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private static final int SIZE_PER_PAGE = 5;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;
    private final PromotionRepository promotionRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, AddressRepository addressRepository,
                            UserRepository userRepository, LaptopRepository laptopRepository,
                            PromotionRepository promotionRepository, PlatformTransactionManager txManager) {
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.promotionRepository = promotionRepository;
        this.txTemplate = new TransactionTemplate(txManager);
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
            OrderDetailDTO orderDetailDTO = ModelMapperUtil.map(order, OrderDetailDTO.class);
            orderDetailDTO.setItems(items);
            return orderDetailDTO;
        });
    }

    @Override
    public Order createOrder(Integer addressId, String username) throws JsonProcessingException {
        boolean isValidAddress = addressRepository.existsByIdAndUserUsernameAndRecordStatusTrue(addressId, username);
        if (!isValidAddress) {
            throw new IllegalArgumentException(ErrorMessageConstants.INVALID_DELIVERY_ADDRESS);
        }

        ObjectMapper om = new ObjectMapper();
        User user = userRepository.findByUsername(username);
        Map<Integer, Integer> cartMap = om.readValue(user.getCart(), new TypeReference<>() {
        });
        if (cartMap.isEmpty()) {
            throw new IllegalArgumentException(ErrorMessageConstants.EMPTY_CART);
        }

        // Sync with Database
        Set<Integer> laptopIdsInCart = cartMap.keySet();
        List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(cartMap.keySet());
        String[] newCartJSON = {null};
        if (laptopIdsInCart.size() != laptops.size()) {
            List<Integer> laptopIdsAvailable = laptops.stream().map(Laptop::getId).collect(Collectors.toList());
            laptopIdsInCart.stream().filter(id -> !laptopIdsAvailable.contains(id)).forEach(cartMap::remove);
            newCartJSON[0] = om.writeValueAsString(cartMap);
        }

        return txTemplate.execute((status) -> {
            if (newCartJSON[0] != null) {
                user.setCart(newCartJSON[0]);
            }

            LocalDate orderDate = LocalDate.now(ZoneId.of(OrderConstants.DELIVERY_TIME_ZONE));
            LocalDate deliveryDate = DateUtil.addWorkingDays(orderDate, OrderConstants.DELIVERY_DAYS);
            Address address = addressRepository.getOne(addressId);
            List<OrderItem> items = buildOrderItemDetails(laptops, cartMap);
            long itemsPrice = items.stream().filter(OrderItem::isLaptopItem).mapToLong(OrderItem::getTotalPrice).sum();

            // Build order
            Order order = Order.builder()
                    .orderDate(orderDate)
                    .deliveryDate(deliveryDate)
                    .transportFee(OrderConstants.TRANSPORT_FEE)
                    .totalPrice(itemsPrice + OrderConstants.TRANSPORT_FEE)
                    .status(OrderStatus.PENDING).build();

            // Map delivery address -> order delivery info & prevent addressId = new orderId
            ModelMapperUtil.map(address, order);
            order.setId(null);

            // Build order items
            items.forEach(item -> item.setOrder(order));
            order.setOrderItems(items);
            return orderRepository.saveAndFlush(order);
        });
    }

    private List<OrderItem> buildOrderItemDetails(List<Laptop> laptops, Map<Integer, Integer> cartMap) {
        // Get Laptop Items from Cart
        List<OrderItem> items = laptops.stream().map(laptop -> {
            Integer quantity = cartMap.get(laptop.getId());
            Long unitPrice = laptop.getUnitPrice();
            Long totalPrice = unitPrice * quantity;
            return OrderItem.builder()
                    .productId(laptop.getId())
                    .productType(ProductType.LAPTOP)
                    .productName(laptop.getName())
                    .unitPrice(unitPrice)
                    .quantity(quantity)
                    .totalPrice(totalPrice).build();
        }).collect(Collectors.toList());

        // Get Promotions Items from Cart - find and calculate total quantities per promotion
        Map<Integer, OrderItem> promotionItemMap = new HashMap<>();
        items.forEach(laptop -> {
            List<Promotion> promotions = promotionRepository.findByRecordStatusTrueAndLaptopsId(laptop.getProductId());
            for (Promotion promotion : promotions) {
                Integer quantity = laptop.getQuantity();
                Integer promotionId = promotion.getId();
                OrderItem item;
                if (promotionItemMap.containsKey(promotionId)) {
                    item = promotionItemMap.get(promotionId);
                    item.setQuantity(item.getQuantity() + quantity);
                } else {
                    item = OrderItem.builder()
                            .productId(promotion.getId())
                            .productName(promotion.getName())
                            .productType(ProductType.PROMOTION)
                            .quantity(quantity)
                            .unitPrice(promotion.getPrice()).build();
                }
                promotionItemMap.put(promotionId, item);
            }
        });

        Collection<OrderItem> promotionItems = promotionItemMap.values();
        for (OrderItem promotionItem : promotionItems) {
            Long unitPrice = promotionItem.getUnitPrice();
            Long totalPrice = unitPrice * promotionItem.getQuantity();
            promotionItem.setTotalPrice(totalPrice);
        }

        items.addAll(promotionItems);
        return items;
    }
}