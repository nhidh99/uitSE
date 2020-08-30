package org.example.service.impl;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import lombok.Builder;
import lombok.Data;
import org.example.dao.LaptopRepository;
import org.example.dao.PromotionRepository;
import org.example.dao.UserRepository;
import org.example.model.Promotion;
import org.example.model.User;
import org.example.projection.LaptopBlockData;
import org.example.service.api.UserService;
import org.example.type.SocialMediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LaptopRepository laptopRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Map<SocialMediaType, Boolean> findSocialMediaAuthByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return new HashMap<SocialMediaType, Boolean>() {{
            put(SocialMediaType.FACEBOOK, user.getFacebookId() != null);
            put(SocialMediaType.GOOGLE, user.getGoogleId() != null);
        }};
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    @Transactional
    public Map<String, Object> findPaymentByUsername(String username) throws JsonProcessingException {
        // Parse Cart-JSON to Cart-HashMap
        ObjectMapper om = new ObjectMapper();
        User user = userRepository.findByUsername(username);
        String cartJSON = user.getCart();
        MapType type = TypeFactory.defaultInstance().constructMapType(HashMap.class, Integer.class, Integer.class);
        Map<Integer, Integer> cartMap = om.readValue(cartJSON, type);

        // Get Laptops
        List<Integer> laptopIdsInCart = new LinkedList<>(cartMap.keySet());
        List<LaptopBlockData> laptops = laptopRepository.findBlockDataByRecordStatusTrueAndIdIn(laptopIdsInCart);

        // Sync with Database
        if (laptopIdsInCart.size() != laptops.size()) {
            List<Integer> laptopIdsAvailable = laptops.stream().map(LaptopBlockData::getId).collect(Collectors.toList());
            laptopIdsInCart.stream().filter(id -> !laptopIdsAvailable.contains(id)).forEach(cartMap::remove);
            cartJSON = om.writeValueAsString(cartMap);
            user.setCart(cartJSON);
            userRepository.save(user);
        }

        // Return null output if cart is empty
        if (cartMap.isEmpty()) { return null; }

        // Get Laptop Items from Cart
        List<CartItem> laptopItems = laptops.stream().map(laptop -> {
            Integer quantity = cartMap.get(laptop.getId());
            Long totalPrice = quantity * laptop.getUnitPrice();
            return CartItem.builder()
                    .id(laptop.getId())
                    .name(laptop.getName())
                    .alt(laptop.getAlt())
                    .unitPrice(laptop.getUnitPrice())
                    .quantity(quantity)
                    .totalPrice(totalPrice).build();
        }).collect(Collectors.toList());

        // Get Promotions Items from Cart - find and calculate total quantities per promotion
        List<CartItem> promotionItems = new ArrayList<>();
        laptopItems.forEach(laptop -> {
            List<Promotion> promotions = promotionRepository.findByRecordStatusTrueAndLaptopsId(laptop.getId());
            for (Promotion promotion : promotions) {
                Integer addedQuantity = laptop.getQuantity();
                int index = IntStream.range(0, promotionItems.size())
                        .filter(i -> promotion.getId().equals(promotionItems.get(i).getId()))
                        .findFirst().orElse(-1);
                if (index == -1) {
                    CartItem item = CartItem.builder()
                            .id(promotion.getId())
                            .name(promotion.getName())
                            .alt(promotion.getAlt())
                            .unitPrice(promotion.getPrice())
                            .quantity(addedQuantity).build();
                    promotionItems.add(item);
                } else {
                    CartItem item = promotionItems.get(index);
                    item.setQuantity(item.getQuantity() + addedQuantity);
                    promotionItems.set(index, item);
                }
            }
        });

        // Set promotions total prices & Calculate total figures
        int promotionCount = 0, laptopCount = 0;
        long promotionPrice = 0, laptopPrice = 0;

        for (CartItem promotionItem : promotionItems) {
            Integer quantity = promotionItem.getQuantity();
            Long unitPrice = promotionItem.getUnitPrice();
            long totalPrice = quantity * unitPrice;
            promotionCount += quantity;
            promotionPrice += totalPrice;
            promotionItem.setTotalPrice(totalPrice);
        }

        for (CartItem laptopItem : laptopItems) {
            laptopCount += laptopItem.getQuantity();
            laptopPrice += laptopItem.getTotalPrice();
        }

        // Set output
        Map<String, Object> output = new HashMap<>();
        output.put("laptops", laptopItems);
        output.put("laptop_count", laptopCount);
        output.put("laptop_price", laptopPrice);
        output.put("promotions", promotionItems);
        output.put("promotion_count", promotionCount);
        output.put("promotion_price", promotionPrice);
        return output;
    }

    @Data
    @Builder
    private static class CartItem {
        @JsonProperty("id")
        private Integer id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("quantity")
        private Integer quantity;

        @JsonProperty("alt")
        private String alt;

        @JsonProperty("unit_price")
        private Long unitPrice;

        @JsonProperty("total_price")
        private Long totalPrice;
    }
}