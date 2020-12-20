package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.constant.ErrorMessageConstants;
import org.example.constant.OrderConstants;
import org.example.dao.*;
import org.example.dao.custom.LaptopPromotionRepository;
import org.example.dto.order.OrderDetailDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.dto.order.OrderSummaryDTO;
import org.example.input.query.OrderSearchInput;
import org.example.model.*;
import org.example.service.api.OrderService;
import org.example.service.util.PageableUtil;
import org.example.type.OrderStatus;
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
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class OrderServiceImpl implements OrderService {

    private static final int SIZE_PER_PAGE = 5;
    private static final String EMPTY_CART = "{}";

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;
    private final PromotionRepository promotionRepository;
    private final LaptopPromotionRepository laptopPromotionRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, AddressRepository addressRepository,
                            UserRepository userRepository, LaptopRepository laptopRepository,
                            PromotionRepository promotionRepository, LaptopPromotionRepository laptopPromotionRepository,
                            PlatformTransactionManager txManager) {
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.promotionRepository = promotionRepository;
        this.laptopPromotionRepository = laptopPromotionRepository;
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
            checkRequestAuthority(username, orderId);
            Order order = orderRepository.getOne(orderId);
            return ModelMapperUtil.map(order, OrderDetailDTO.class);
        });
    }

    private void checkRequestAuthority(String username, Integer orderId) {
        boolean isValidRequest = orderRepository.existsByIdAndUserUsername(orderId, username);
        if (!isValidRequest) {
            throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
        }
    }

    @Override
    public Integer insertUserOrder(Integer addressId, String username) throws JsonProcessingException {
        return txTemplate.execute((status) -> {
            checkDeliveryAddressId(addressId, username);
            Order order = createUserOrder(addressId, username);
            return orderRepository.saveAndFlush(order).getId();
        });
    }

    private void checkDeliveryAddressId(Integer addressId, String username) {
        boolean isValidAddress = addressRepository.existsByIdAndUserUsernameAndRecordStatusTrue(addressId, username);
        if (!isValidAddress) {
            throw new IllegalArgumentException(ErrorMessageConstants.INVALID_DELIVERY_ADDRESS);
        }
    }

    private Order createUserOrder(Integer addressId, String username) {
        List<OrderItem> items = createUserOrderItems(username);
        return createUserOrder(addressId, items);
    }

    private Order createUserOrder(Integer addressId, List<OrderItem> items) {
        Order order = new Order();
        initOrderDeliveryDate(order);
        initOrderDeliveryAddress(order, addressId);
        initOrderItems(order, items);
        initOrderStatus(order);
        return order;
    }

    private void initOrderDeliveryDate(Order order) {
        LocalDate orderDate = DateUtil.getCurrentLocalDate();
        LocalDate deliveryDate = DateUtil.addWorkingDays(orderDate, OrderConstants.DELIVERY_DAYS);
        order.setOrderDate(orderDate);
        order.setDeliveryDate(deliveryDate);
    }

    private void initOrderDeliveryAddress(Order order, Integer addressId) {
        Address address = addressRepository.getOne(addressId);
        ModelMapperUtil.map(address, order);
        order.setTransportFee(OrderConstants.TRANSPORT_FEE);
        order.setId(null);
    }

    private void initOrderItems(Order order, List<OrderItem> items) {
        long totalLaptopPrice = items.stream().filter(OrderItem::isLaptopItem).mapToLong(OrderItem::getTotalPrice).sum();
        items.forEach(item -> item.setOrder(order));
        order.setTotalPrice(totalLaptopPrice + OrderConstants.TRANSPORT_FEE);
        order.setItems(items);
    }

    private void initOrderStatus(Order order) {
        OrderTrack track = OrderTrack.builder()
                .createdAt(DateUtil.getCurrentLocalDateTime())
                .status(OrderStatus.PENDING).order(order).build();
        order.setTracks(Collections.singletonList(track));
        order.setStatus(OrderStatus.PENDING);
    }

    private List<OrderItem> createUserOrderItems(String username) {
        Map<Integer, Integer> userCart = createUserCart(username);
        Stream<OrderItem> laptopItems = createLaptopItemsFromUserCart(userCart);
        Stream<OrderItem> promotionItems = createPromotionItemsFromUserCart(userCart);
        return Stream.concat(laptopItems, promotionItems).collect(Collectors.toList());
    }

    private Map<Integer, Integer> createUserCart(String username) {
        User user = userRepository.findByUsername(username);
        String cartJSON = user.getCart();
        user.clearCart();
        return createCartFromJSON(cartJSON);
    }

    private Map<Integer, Integer> createCartFromJSON(String cartJSON) {
        checkUserEmptyCart(cartJSON);
        try {
            return new ObjectMapper().readValue(cartJSON, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException(ErrorMessageConstants.SERVER_ERROR);
        }
    }

    private void checkUserEmptyCart(String cartJSON) {
        boolean isEmptyCart = cartJSON == null || EMPTY_CART.equals(cartJSON);
        if (isEmptyCart) {
            throw new IllegalArgumentException(ErrorMessageConstants.EMPTY_CART);
        }
    }

    private Stream<OrderItem> createLaptopItemsFromUserCart(Map<Integer, Integer> userCart) {
        Set<Integer> laptopIds = userCart.keySet();
        List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(laptopIds);
        syncUserCartWithDatabase(userCart, laptops);
        return laptops.stream().map(laptop -> OrderItem.fromLaptop(laptop, userCart.get(laptop.getId())));
    }

    private void syncUserCartWithDatabase(Map<Integer, Integer> userCart, List<Laptop> laptops) {
        Set<Integer> laptopIdsInCart = userCart.keySet();
        if (laptopIdsInCart.size() != laptops.size()) {
            List<Integer> laptopIdsAvailable = laptops.stream().map(Laptop::getId).collect(Collectors.toList());
            laptopIdsInCart.stream().filter(id -> !laptopIdsAvailable.contains(id)).forEach(userCart::remove);
        }
    }

    private Stream<OrderItem> createPromotionItemsFromUserCart(Map<Integer, Integer> userCart) {
        Map<Integer, Integer> counts = createPromotionCountsFromCart(userCart);
        Set<Integer> promotionIds = counts.keySet();
        List<Promotion> promotions = promotionRepository.findByRecordStatusTrueAndIdIn(promotionIds);
        return promotions.stream().map(promotion -> OrderItem.fromPromotion(promotion, counts.get(promotion.getId())));
    }

    private Map<Integer, Integer> createPromotionCountsFromCart(Map<Integer, Integer> userCart) {
        Set<Integer> laptopIds = userCart.keySet();
        List<Pair<Integer, Integer>> keys = laptopPromotionRepository.findKeysByLaptopIdsOrderByPromotionId(laptopIds);
        return createPromotionCountsFromCart(userCart, keys);
    }

    private Map<Integer, Integer> createPromotionCountsFromCart(Map<Integer, Integer> userCart,
                                                                List<Pair<Integer, Integer>> compositeKeys) {
        int arrIndex = 0, promotionQty = 0;
        Integer[] promotionIds = compositeKeys.stream().map(Pair::getSecond).distinct().toArray(Integer[]::new);
        Map<Integer, Integer> output = new LinkedHashMap<>();

        for (Pair<Integer, Integer> key : compositeKeys) {
            int promotionId = key.getSecond();
            if (promotionIds[arrIndex] != promotionId) {
                output.put(promotionIds[arrIndex], promotionQty);
                arrIndex++;
                promotionQty = 0;
            }
            int laptopId = key.getFirst();
            int promotionQtyFromLaptop = userCart.get(laptopId);
            promotionQty += promotionQtyFromLaptop;
        }

        output.put(promotionIds[arrIndex], promotionQty);
        return output;
    }

    @Override
    public void cancelOrderByIdAndUsername(String username, Integer orderId) {
        txTemplate.executeWithoutResult((status) -> {
            boolean isValidRequest = orderRepository.existsByIdAndUserUsername(orderId, username);
            if (!isValidRequest) {
                throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
            }

            Order order = orderRepository.getOne(orderId);
            order.setStatus(OrderStatus.CANCELED);
            OrderTrack track = OrderTrack.builder().order(order).status(OrderStatus.CANCELED)
                    .createdAt(DateUtil.getCurrentLocalDateTime()).build();
            order.addTrack(track);
        });
    }

    @Override
    public Pair<List<OrderSummaryDTO>, Long> findOrderSummariesBySearch(OrderSearchInput search) {
        Pageable pageable = PageableUtil.createPageableFromSearch(search);
        OrderStatus status = search.getStatus();
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