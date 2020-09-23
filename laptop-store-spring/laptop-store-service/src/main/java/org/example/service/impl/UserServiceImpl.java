package org.example.service.impl;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import lombok.Builder;
import lombok.Data;
import org.example.constant.ErrorMessageConstants;
import org.example.dao.model.AddressRepository;
import org.example.dao.model.LaptopRepository;
import org.example.dao.model.PromotionRepository;
import org.example.dao.model.UserRepository;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.input.PasswordInput;
import org.example.input.UserInfoInput;
import org.example.model.Laptop;
import org.example.model.Promotion;
import org.example.model.User;
import org.example.projection.LaptopBlockData;
import org.example.service.api.UserService;
import org.example.type.SocialMediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;
    private final PromotionRepository promotionRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final TransactionTemplate txTemplate;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, LaptopRepository laptopRepository,
                           PromotionRepository promotionRepository, AddressRepository addressRepository,
                           PasswordEncoder passwordEncoder, PlatformTransactionManager txManager) {
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.promotionRepository = promotionRepository;
        this.addressRepository = addressRepository;
        this.passwordEncoder = passwordEncoder;
        this.txTemplate = new TransactionTemplate(txManager);
    }

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
    public void updateUserInfoByUsername(String username, UserInfoInput userInfoInput) {
        User user = userRepository.findByUsername(username);
        user.setName(userInfoInput.getName());
        user.setPhone(userInfoInput.getPhone());
        user.setEmail(userInfoInput.getEmail());
        user.setGender(userInfoInput.getGender());
        userRepository.save(user);
    }

    @Override
    public Map<String, Object> findPaymentByUsername(String username) throws JsonProcessingException {
        // Parse Cart-JSON to Cart-HashMap
        ObjectMapper om = new ObjectMapper();
        User user = userRepository.findByUsername(username);
        String cartJSON = user.getCart();
        MapType type = TypeFactory.defaultInstance().constructMapType(HashMap.class, Integer.class, Integer.class);
        Map<Integer, Integer> cartMap = om.readValue(cartJSON, type);

        // Get Laptops
        List<Integer> laptopIdsInCart = new LinkedList<>(cartMap.keySet());
        List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(laptopIdsInCart);

        // Sync with Database
        if (laptopIdsInCart.size() != laptops.size()) {
            List<Integer> laptopIdsAvailable = laptops.stream().map(Laptop::getId).collect(Collectors.toList());
            laptopIdsInCart.stream().filter(id -> !laptopIdsAvailable.contains(id)).forEach(cartMap::remove);
            cartJSON = om.writeValueAsString(cartMap);
            user.setCart(cartJSON);
            userRepository.save(user);
        }

        // Return null output if cart is empty
        if (cartMap.isEmpty()) {
            return null;
        }

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

    @Override
    public void updateUserDefaultAddressId(String username, Integer addressId) {
        txTemplate.executeWithoutResult((status) -> {
            boolean isValidRequest = addressRepository.existsByIdAndUserUsername(addressId, username);
            if (!isValidRequest) throw new IllegalArgumentException(ErrorMessageConstants.FORBIDDEN);
            User user = userRepository.findByUsername(username);
            user.setDefaultAddressId(addressId);
        });
    }

    @Override
    public void updateUserPassword(PasswordInput passwordInput, String username) {
        txTemplate.executeWithoutResult((status) -> {
            User user = userRepository.findByUsername(username);
            if (!BCrypt.checkpw(passwordInput.getOldPassword(), user.getPassword())) {
                throw new IllegalArgumentException(ErrorMessageConstants.WRONG_OLD_PASSWORD);
            }

            if (!passwordInput.getNewPassword().equals(passwordInput.getConfirmPassword())) {
                throw new IllegalArgumentException(ErrorMessageConstants.MISMATCH_NEW_PASSWORDS);
            }

            String newHashedPassword = passwordEncoder.encode(passwordInput.getNewPassword());
            user.setPassword(newHashedPassword);
        });
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