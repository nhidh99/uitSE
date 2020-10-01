package org.example.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.constant.ErrorMessageConstants;
import org.example.constant.SuccessMessageConstants;
import org.example.dto.address.AddressOverviewDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.input.PasswordInput;
import org.example.input.UserInfoInput;
import org.example.model.User;
import org.example.service.api.AddressService;
import org.example.service.api.LaptopService;
import org.example.service.api.OrderService;
import org.example.service.api.UserService;
import org.example.type.SocialMediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("isAuthenticated()")
public class UserRestService {
    @Autowired
    private UserService userService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private LaptopService laptopService;
    @Autowired
    private OrderService orderService;

    @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PutMapping(value = "/me", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putCurrentUser(@AuthenticationPrincipal UserDetails userDetails,
                                            @RequestBody UserInfoInput userInfoInput) {
        try {
            String username = userDetails.getUsername();
            userService.updateUserInfoByUsername(username, userInfoInput);
            return ResponseEntity.ok(SuccessMessageConstants.PUT_USER_INFO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessageConstants.SERVER_ERROR);
        }
    }

    @GetMapping(value = "/me/social-auth", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserSocialMediaAuth(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        Map<SocialMediaType, Boolean> userAuth = userService.findSocialMediaAuthByUsername(username);
        return ResponseEntity.ok(userAuth);
    }

    @GetMapping(value = "/me/addresses", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserAddresses(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            String username = userDetails.getUsername();
            List<AddressOverviewDTO> addresses = addressService.findOverviewsByUsername(username);
            return ResponseEntity.ok(addresses);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessageConstants.SERVER_ERROR);
        }
    }

    @GetMapping(value = "/me/orders", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserOrderOverviews(@AuthenticationPrincipal UserDetails userDetails,
                                                          @RequestParam(value = "page", defaultValue = "1") int page) {
        String username = userDetails.getUsername();
        List<OrderOverviewDTO> orders = orderService.findOverviewByUsernameAndPage(username, page);
        Long totalOrderCount = orderService.countByUsername(username);
        return ResponseEntity.ok().header("X-Total-Count", totalOrderCount.toString()).body(orders);
    }

    @GetMapping(value = "/me/wish-list", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserWishList(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            String username = userDetails.getUsername();
            User user = userService.findByUsername(username);
            String wishListJSON = user.getWishList();
            if (wishListJSON == null) {
                return ResponseEntity.ok(Collections.emptyList());
            }
            ObjectMapper om = new ObjectMapper();
            List<Integer> laptopIds = om.readValue(user.getWishList(), new TypeReference<List<Integer>>() {
            });
            List<LaptopOverviewDTO> laptops = laptopService.findByIds(laptopIds);
            return ResponseEntity.ok(laptops);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/me/cart", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putCurrentUserCart(@AuthenticationPrincipal UserDetails userDetails,
                                                @RequestBody Map<String, String> requestBody) {
        try {
            String cartJSON = requestBody.get("cartJSON");
            userService.updateUserCart(userDetails.getUsername(), cartJSON);
            return ResponseEntity.noContent().build();
        } catch (IllegalAccessError e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessageConstants.SERVER_ERROR);
        }
    }

    @GetMapping(value = "/me/payment", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserPayment(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            String username = userDetails.getUsername();
            Map<String, Object> output = userService.findPaymentByUsername(username);
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(value = "/me/default-address", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putCurrentUserDefaultAddressId(@RequestBody Map<String, Integer> requestBody,
                                                            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Integer addressId = requestBody.get("address_id");
            String username = userDetails.getUsername();
            userService.updateUserDefaultAddressId(username, addressId);
            return ResponseEntity.ok(SuccessMessageConstants.PUT_USER_DEFAULT_ADDRESS);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessageConstants.SERVER_ERROR);
        }
    }

    @PutMapping(value = "/me/password", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putCurrentUserPassword(@RequestBody PasswordInput passwordInput,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        try {
            String username = userDetails.getUsername();
            userService.updateUserPassword(passwordInput, username);
            return ResponseEntity.ok(SuccessMessageConstants.PUT_USER_PASSWORD);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessageConstants.SERVER_ERROR);
        }
    }
}