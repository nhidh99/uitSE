package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.constant.ErrorMessageConstants;
import org.example.dao.*;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.order.OrderItemDTO;
import org.example.dto.order.OrderCheckoutDTO;
import org.example.helper.api.OrderHelper;
import org.example.input.form.PasswordInput;
import org.example.input.form.UserInfoInput;
import org.example.model.Laptop;
import org.example.model.Order;
import org.example.model.Promotion;
import org.example.model.User;
import org.example.service.api.UserService;
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
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final OrderHelper orderHelper;
    private final TransactionTemplate txTemplate;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, LaptopRepository laptopRepository,
                           AddressRepository addressRepository, PasswordEncoder passwordEncoder,
                           OrderHelper orderHelper, PlatformTransactionManager txManager) {
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.addressRepository = addressRepository;
        this.passwordEncoder = passwordEncoder;
        this.orderHelper = orderHelper;
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
    public void updateUserInfoByUsername(String username, UserInfoInput userInfo) {
        User user = userRepository.findByUsername(username);
        ModelMapperUtil.map(userInfo, user);
        userRepository.save(user);
    }

    @Override
    public OrderCheckoutDTO findCheckoutByUsername(String username) {
        return txTemplate.execute((status) -> {
            Order order = orderHelper.createUserOrderWithoutAddress(username);
            return ModelMapperUtil.map(order, OrderCheckoutDTO.class);
        });
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