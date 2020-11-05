package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.constant.ErrorMessageConstants;
import org.example.constant.OrderConstants;
import org.example.dao.*;
import org.example.dto.order.*;
import org.example.input.SearchInput;
import org.example.model.*;
import org.example.service.api.OrderService;
import org.example.service.util.PageableUtil;
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
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private static final int SIZE_PER_PAGE = 5;
    private static final String EMPTY_CART = "{}";

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
    public Pair<List<OrderOverviewDTO>, Long> findOverviewByUsernameAndPage(String username, int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            List<Order> orders = orderRepository.findByUserUsername(username, pageable);
            long orderCount = orderRepository.countByUserUsername(username);
            return Pair.of(ModelMapperUtil.mapList(orders, OrderOverviewDTO.class), orderCount);
        });
    }

    @Override
    public OrderDetailDTO findOrderDTOByOrderIdAndUsername(Integer orderId, String username) {
        return txTemplate.execute((status) -> {
            boolean isInvalidRequest = !orderRepository.existsByIdAndUserUsername(orderId, username);
            if (isInvalidRequest) throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);

            Order order = orderRepository.getOne(orderId);
            List<OrderItemDTO> items = ModelMapperUtil.mapList(order.getItems(), OrderItemDTO.class);
            List<OrderTrackDTO> tracks = ModelMapperUtil.mapList(order.getTracks(), OrderTrackDTO.class);
            OrderDetailDTO orderDetailDTO = ModelMapperUtil.map(order, OrderDetailDTO.class);
            orderDetailDTO.setItems(items);
            orderDetailDTO.setTracks(tracks);
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
        if (laptopIdsInCart.size() != laptops.size()) {
            List<Integer> laptopIdsAvailable = laptops.stream().map(Laptop::getId).collect(Collectors.toList());
            laptopIdsInCart.stream().filter(id -> !laptopIdsAvailable.contains(id)).forEach(cartMap::remove);
        }

        return txTemplate.execute((status) -> {
            // Build order info
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
            order.setItems(items);

            // Set order pending status
            OrderTrack track = OrderTrack.builder()
                    .createdAt(LocalDateTime.now(ZoneId.of(OrderConstants.DELIVERY_TIME_ZONE)))
                    .status(OrderStatus.PENDING).order(order).build();
            order.setTracks(Collections.singletonList(track));

            // Clear user cart
            user.setCart(EMPTY_CART);

            // Save order
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
                            .productType(ProductType.PROMOTION)
                            .productId(promotion.getId())
                            .productName(promotion.getName())
                            .unitPrice(promotion.getPrice())
                            .quantity(quantity).build();
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

    @Override
    public void cancelOrderByIdAndUsername(Integer orderId, String username) {
        txTemplate.executeWithoutResult((status) -> {
            boolean isValidRequest = orderRepository.existsByIdAndUserUsername(orderId, username);
            if (!isValidRequest) {
                throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
            }

            Order order = orderRepository.getOne(orderId);
            order.setStatus(OrderStatus.CANCELED);
            OrderTrack track = OrderTrack.builder().order(order).status(OrderStatus.CANCELED)
                    .createdAt(LocalDateTime.now(ZoneId.of(OrderConstants.DELIVERY_TIME_ZONE))).build();
            order.addTrack(track);
        });
    }

    @Override
    public Pair<List<OrderSummaryDTO>, Long> findSummaryBySearch(OrderStatus status, SearchInput search) {
        Pageable pageable = PageableUtil.buildPageableFromSearch(search);
        return txTemplate.execute((txStatus) -> {
            if (search.getQuery().isEmpty()) {
                List<Order> orders = orderRepository.findByStatus(status, pageable);
                long orderCount = orderRepository.countByStatus(status);
                return Pair.of(ModelMapperUtil.mapList(orders, OrderSummaryDTO.class), orderCount);
            } else {
                // Query includes finding by id / receiver_name / receiver_phone
                String query = search.getQuery();
                List<Order> orders = orderRepository.findByQueryAndStatus(query, status, pageable);
                long orderCount = orderRepository.countByQueryAndStatus(query, status);
                return Pair.of(ModelMapperUtil.mapList(orders, OrderSummaryDTO.class), orderCount);
            }
        });
    }
}