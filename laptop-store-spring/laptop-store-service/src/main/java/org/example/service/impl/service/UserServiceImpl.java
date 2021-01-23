package org.example.service.impl.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.constant.ErrorMessageConstants;
import org.example.dao.LaptopRepository;
import org.example.dao.UserRepository;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.order.OrderCheckoutDTO;
import org.example.input.form.PasswordInput;
import org.example.input.form.UserInfoInput;
import org.example.model.Laptop;
import org.example.model.Order;
import org.example.model.User;
import org.example.service.api.checker.AddressChecker;
import org.example.service.api.checker.LaptopChecker;
import org.example.service.api.checker.PasswordChecker;
import org.example.service.api.creator.OrderCreator;
import org.example.service.api.service.UserService;
import org.example.service.util.JsonUtil;
import org.example.type.SocialMediaType;
import org.example.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;
    private final PasswordChecker passwordChecker;
    private final AddressChecker addressChecker;
    private final LaptopChecker laptopChecker;
    private final PasswordEncoder passwordEncoder;
    private final OrderCreator orderCreator;
    private final TransactionTemplate txTemplate;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, LaptopRepository laptopRepository,
                           PasswordChecker passwordChecker, AddressChecker addressChecker, LaptopChecker laptopChecker, PasswordEncoder passwordEncoder,
                           OrderCreator orderCreator, PlatformTransactionManager txManager) {
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.passwordChecker = passwordChecker;
        this.addressChecker = addressChecker;
        this.laptopChecker = laptopChecker;
        this.passwordEncoder = passwordEncoder;
        this.orderCreator = orderCreator;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public User findCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username);
    }

    @Override
    public Map<SocialMediaType, Boolean> findSocialMediaAuth() {
        return txTemplate.execute((status) -> {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(username);
            Map<SocialMediaType, Boolean> output = new HashMap<>();
            output.put(SocialMediaType.FACEBOOK, user.getFacebookId() != null);
            output.put(SocialMediaType.GOOGLE, user.getGoogleId() != null);
            return output;
        });
    }

    @Override
    public void updateCurrentUserInfo(UserInfoInput userInfo) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        txTemplate.executeWithoutResult((status) -> {
            User user = userRepository.findByUsername(username);
            ModelMapperUtil.map(userInfo, user);
            userRepository.save(user);
        });
    }

    @Override
    public OrderCheckoutDTO findCurrentUserCheckout() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return txTemplate.execute((status) -> {
            Order order = orderCreator.createUserOrderWithoutAddress(username);
            return ModelMapperUtil.map(order, OrderCheckoutDTO.class);
        });
    }

    @Override
    public void updateUserDefaultAddressId(Integer addressId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        txTemplate.executeWithoutResult((status) -> {
            addressChecker.checkExistedUserAddress(username, addressId);
            User user = userRepository.findByUsername(username);
            user.setDefaultAddressId(addressId);
        });
    }

    @Override
    public void updateUserPassword(PasswordInput passwordInput) {
        txTemplate.executeWithoutResult((status) -> {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userRepository.findByUsername(username);
            String oldHashedPassword = user.getPassword();
            passwordChecker.checkPasswordInput(passwordInput, oldHashedPassword);
            String newPassword = passwordInput.getNewPassword();
            String newHashedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(newHashedPassword);
        });
    }

    @Override
    public void updateUserCart(String cartJSON) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        txTemplate.executeWithoutResult((status) -> {
            User user = userRepository.findByUsername(username);
            user.setCart(cartJSON);
        });
    }

    @Override
    public void updateUserWishList(String listJSON) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        txTemplate.executeWithoutResult((status) -> {
            User user = userRepository.findByUsername(username);
            user.setWishList(listJSON);
        });
    }

    @Override
    public List<LaptopOverviewDTO> findUserWishList() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return txTemplate.execute((status) -> {
            User user = userRepository.findByUsername(username);
            if (user.getWishList() == null) { return Collections.EMPTY_LIST; }
            Set<Integer> laptopIds = JsonUtil.parseWishList(user.getWishList());
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(laptopIds);
            return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
        });
    }

    @Override
    public void moveCartItemToWishList(Integer laptopId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        txTemplate.executeWithoutResult((status) -> {
            laptopChecker.checkExistedLaptop(laptopId);
            User user = userRepository.findByUsername(username);

            Set<Integer> wishList = JsonUtil.parseWishList(user.getWishList());
            Map<Integer, Integer> cartMap = JsonUtil.parseCart(user.getCart());
            if (!cartMap.containsKey(laptopId)) {
                throw new IllegalArgumentException(ErrorMessageConstants.ITEM_NOT_FOUND_IN_CART);
            }

            wishList.add(laptopId);
            cartMap.remove(laptopId);
            user.setWishList(JsonUtil.stringify(wishList));
            user.setCart(JsonUtil.stringify(cartMap));
        });
    }
}