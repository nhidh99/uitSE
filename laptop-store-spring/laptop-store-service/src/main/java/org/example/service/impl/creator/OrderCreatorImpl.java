package org.example.service.impl.creator;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.constant.ErrorMessageConstants;
import org.example.constant.OrderConstants;
import org.example.dao.*;
import org.example.dao.custom.LaptopPromotionRepository;
import org.example.model.*;
import org.example.service.api.creator.OrderCreator;
import org.example.type.OrderStatus;
import org.example.util.DateUtil;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class OrderCreatorImpl implements OrderCreator {
    private static final String EMPTY_CART = "{}";

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;
    private final PromotionRepository promotionRepository;
    private final LaptopPromotionRepository laptopPromotionRepository;

    public OrderCreatorImpl(AddressRepository addressRepository,
                            UserRepository userRepository,
                            LaptopRepository laptopRepository,
                            PromotionRepository promotionRepository,
                            LaptopPromotionRepository laptopPromotionRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.promotionRepository = promotionRepository;
        this.laptopPromotionRepository = laptopPromotionRepository;
    }

    @Override
    public Order createUserOrderWithoutAddress(String username) {
        return createUserOrderWithAddress(username, null);
    }

    @Override
    public Order createUserOrderWithAddress(String username, Integer addressId) {
        boolean enableClearCart = addressId != null;
        List<OrderItem> items = createUserOrderItems(username, enableClearCart);
        return createUserOrder(items, addressId);
    }

    private Order createUserOrder(List<OrderItem> items, Integer addressId) {
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
        if (addressId == null) return;
        Address address = addressRepository.getOne(addressId);
        ModelMapperUtil.map(address, order);
        order.setId(null);
    }

    private void initOrderItems(Order order, List<OrderItem> items) {
        long totalLaptopPrice = items.stream().filter(OrderItem::isLaptopItem).mapToLong(OrderItem::getTotalPrice).sum();
        items.forEach(item -> item.setOrder(order));
        order.setTransportFee(OrderConstants.TRANSPORT_FEE);
        order.setTotalPrice(totalLaptopPrice + OrderConstants.TRANSPORT_FEE);
        order.setItems(items);
    }

    private void initOrderStatus(Order order) {
        order.setStatus(OrderStatus.PENDING);
        order.addTrack(OrderStatus.PENDING);
    }

    private List<OrderItem> createUserOrderItems(String username, boolean enableClearCart) {
        Map<Integer, Integer> userCart = createUserCart(username, enableClearCart);
        Stream<OrderItem> laptopItems = createLaptopItemsFromUserCart(userCart);
        Stream<OrderItem> promotionItems = createPromotionItemsFromUserCart(userCart);
        return Stream.concat(laptopItems, promotionItems).collect(Collectors.toList());
    }

    private Map<Integer, Integer> createUserCart(String username, boolean enableClearCart) {
        User user = userRepository.findByUsername(username);
        String cartJSON = user.getCart();
        if (enableClearCart) {
            user.clearCart();
        }
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
}
