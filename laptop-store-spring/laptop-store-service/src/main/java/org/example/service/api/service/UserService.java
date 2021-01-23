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
    User findCurrentUser();

    Map<SocialMediaType, Boolean> findSocialMediaAuth();

    OrderCheckoutDTO findCurrentUserCheckout();

    void updateCurrentUserInfo(UserInfoInput userInfoInput);

    void updateUserDefaultAddressId(Integer addressId);

    void updateUserPassword(PasswordInput passwordInput);

    void updateUserCart(String cartJSON);

    void updateUserWishList(String listJSON);

    List<LaptopOverviewDTO> findUserWishList();

    void moveCartItemToWishList(Integer laptopId);
}