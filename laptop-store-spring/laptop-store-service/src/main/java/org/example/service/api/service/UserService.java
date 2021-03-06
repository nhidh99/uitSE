package org.example.service.api.service;

import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.order.OrderCheckoutDTO;
import org.example.input.form.PasswordInput;
import org.example.input.form.UserInfoInput;
import org.example.model.User;
import org.example.type.SocialMediaType;

import java.util.List;
import java.util.Map;

public interface UserService {
    User findByUsername(String username);

    Map<SocialMediaType, Boolean> findSocialMediaAuthByUsername(String username);

    OrderCheckoutDTO findCheckoutByUsername(String username);

    void updateUserInfoByUsername(String username, UserInfoInput userInfoInput);

    void updateUserDefaultAddressId(String username, Integer addressId);

    void updateUserPassword(PasswordInput passwordInput);

    void updateUserCart(String username, String cartJSON);

    void updateUserWishList(String username, String listJSON);

    List<LaptopOverviewDTO> findUserWishList(String username);

    void moveCartItemToWishList(String username, Integer laptopId);
}