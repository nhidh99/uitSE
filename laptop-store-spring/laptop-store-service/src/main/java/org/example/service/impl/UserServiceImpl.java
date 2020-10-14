package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.constant.ErrorMessageConstants;
import org.example.dao.*;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.milestone.MilestoneDTO;
import org.example.dto.order.OrderItemDTO;
import org.example.dto.order.OrderCheckoutDTO;
import org.example.input.PasswordInput;
import org.example.input.UserInfoInput;
import org.example.model.Laptop;
import org.example.model.Milestone;
import org.example.model.Promotion;
import org.example.model.User;
import org.example.service.api.UserService;
import org.example.type.MilestoneLevelType;
import org.example.type.MilestoneType;
import org.example.type.ProductType;
import org.example.type.SocialMediaType;
import org.example.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.*;
import java.util.stream.Collectors;

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
                           PasswordEncoder passwordEncoder, MilestoneRepository milestoneRepository,
                           PlatformTransactionManager txManager) {
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
        return new HashMap<>() {{
            put(SocialMediaType.FACEBOOK, user.getFacebookId() != null);
            put(SocialMediaType.GOOGLE, user.getGoogleId() != null);
        }};
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
    public OrderCheckoutDTO findCheckoutByUsername(String username) {
        return txTemplate.execute((status) -> {
            try {
                // Parse Cart-JSON to Cart-Map
                ObjectMapper om = new ObjectMapper();
                User user = userRepository.findByUsername(username);
                Map<Integer, Integer> cartMap = om.readValue(user.getCart(), new TypeReference<>() {
                });
                if (cartMap.isEmpty()) {
                    return OrderCheckoutDTO.fromItems(Collections.EMPTY_LIST);
                }

                // Sync with Database
                Set<Integer> laptopIdsInCart = cartMap.keySet();
                List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(cartMap.keySet());
                if (laptopIdsInCart.size() != laptops.size()) {
                    List<Integer> laptopIdsAvailable = laptops.stream().map(Laptop::getId).collect(Collectors.toList());
                    laptopIdsInCart.stream().filter(id -> !laptopIdsAvailable.contains(id)).forEach(cartMap::remove);
                    String cartJSON = om.writeValueAsString(cartMap);
                    user.setCart(cartJSON);
                }

                // Buid order items -> order payment
                List<OrderItemDTO> items = buildOrderItems(laptops, cartMap);
                return OrderCheckoutDTO.fromItems(items);
            } catch (JsonProcessingException e) {
                throw new IllegalArgumentException(ErrorMessageConstants.SERVER_ERROR);
            }
        });
    }

    private List<OrderItemDTO> buildOrderItems(List<Laptop> laptops, Map<Integer, Integer> cartMap) {
        // Get Laptop Items from Cart
        List<OrderItemDTO> items = laptops.stream().map(laptop -> {
            Integer quantity = cartMap.get(laptop.getId());
            return OrderItemDTO.builder()
                    .productId(laptop.getId())
                    .productType(ProductType.LAPTOP)
                    .productName(laptop.getName())
                    .unitPrice(laptop.getUnitPrice())
                    .quantity(quantity).build();
        }).collect(Collectors.toList());

        // Get Promotions Items from Cart - find and calculate total quantities per promotion
        Map<Integer, OrderItemDTO> promotionItemMap = new HashMap<>();
        items.forEach(laptop -> {
            List<Promotion> promotions = promotionRepository.findByRecordStatusTrueAndLaptopsId(laptop.getProductId());
            for (Promotion promotion : promotions) {
                Integer quantity = laptop.getQuantity();
                Integer promotionId = promotion.getId();
                OrderItemDTO item;
                if (promotionItemMap.containsKey(promotionId)) {
                    item = promotionItemMap.get(promotionId);
                    item.setQuantity(item.getQuantity() + quantity);
                } else {
                    item = OrderItemDTO.builder()
                            .productId(promotion.getId())
                            .productType(ProductType.PROMOTION)
                            .productName(promotion.getName())
                            .unitPrice(promotion.getPrice())
                            .quantity(quantity).build();
                }
                promotionItemMap.put(promotionId, item);
            }
        });
        items.addAll(promotionItemMap.values());
        return items;
    }

    @Override
    public void updateUserDefaultAddressId(String username, Integer addressId) {
        txTemplate.executeWithoutResult((status) -> {
            boolean isValidRequest = addressRepository.existsByIdAndUserUsernameAndRecordStatusTrue(addressId, username);
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

    @Override
    public void updateUserCart(String username, String cartJSON) {
        txTemplate.executeWithoutResult((status) -> {
            User user = userRepository.findByUsername(username);
            user.setCart(cartJSON);
        });
    }

    @Override
    public void updateUserWishList(String username, String listJSON) {
        txTemplate.executeWithoutResult((status) -> {
            User user = userRepository.findByUsername(username);
            user.setWishList(listJSON);
        });
    }

    @Override
    public List<LaptopOverviewDTO> findUserWishList(String username) {
        return txTemplate.execute((status) -> {
            User user = userRepository.findByUsername(username);
            if (user.getWishList() == null) {
                return Collections.EMPTY_LIST;
            }
            try {
                ObjectMapper om = new ObjectMapper();
                List<Integer> laptopIds = om.readValue(user.getWishList(), new TypeReference<>() {
                });
                List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(laptopIds);
                return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
            } catch (JsonProcessingException e) {
                return Collections.EMPTY_LIST;
            }
        });
    }

    @Override
    public void moveCartItemToWishList(String username, Integer laptopId) {
        txTemplate.executeWithoutResult((status) -> {
            String errorMessage = null;
            User user = userRepository.findByUsername(username);
            boolean isExistedLaptop = laptopRepository.existsByIdAndRecordStatusTrue(laptopId);

            if (isExistedLaptop) {
                try {
                    ObjectMapper om = new ObjectMapper();
                    Set<Integer> wishListLaptopIds = om.readValue(user.getWishList(), new TypeReference<>() {
                    });
                    Map<Integer, Integer> cartMap = om.readValue(user.getCart(), new TypeReference<>() {
                    });
                    if (!cartMap.containsKey(laptopId)) {
                        errorMessage = ErrorMessageConstants.ITEM_NOT_FOUND_IN_CART;
                    } else {
                        wishListLaptopIds.add(laptopId);
                        cartMap.remove(laptopId);
                        String wishListJSON = om.writeValueAsString(wishListLaptopIds);
                        String cartJSON = om.writeValueAsString(cartMap);
                        user.setWishList(wishListJSON);
                        user.setCart(cartJSON);
                    }
                } catch (JsonProcessingException e) {
                    errorMessage = ErrorMessageConstants.SERVER_ERROR;
                }
            } else {
                errorMessage = ErrorMessageConstants.LAPTOP_NOT_FOUND;
            }

            if (errorMessage != null) {
                throw new IllegalArgumentException(errorMessage);
            }
        });
    }

    @Override
    public void setDefaultAddress(String username, Integer addressId) {
        boolean isValidRequest = addressRepository.existsByIdAndUserUsernameAndRecordStatusTrue(addressId, username);
        if (!isValidRequest) {
            throw new IllegalArgumentException(ErrorMessageConstants.INVALID_ADDRESS);
        }
        txTemplate.executeWithoutResult((status) -> {
            User user = userRepository.findByUsername(username);
            user.setDefaultAddressId(addressId);
        });
    }
}