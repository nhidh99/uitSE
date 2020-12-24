package org.example.rest;

import org.example.constant.HeaderConstants;
import org.example.constant.SuccessMessageConstants;
import org.example.dto.address.AddressOverviewDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.milestone.MilestoneDTO;
import org.example.dto.order.OrderOverviewDTO;
import org.example.dto.order.OrderCheckoutDTO;
import org.example.input.form.PasswordInput;
import org.example.input.form.UserInfoInput;
import org.example.model.User;
import org.example.service.api.service.AddressService;
import org.example.service.api.service.MilestoneService;
import org.example.service.api.service.OrderService;
import org.example.service.api.service.UserService;
import org.example.type.SocialMediaType;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("isAuthenticated()")
public class UserRestService {

    private final UserService userService;
    private final AddressService addressService;
    private final OrderService orderService;
    private final MilestoneService milestoneService;

    @Autowired
    public UserRestService(UserService userService, AddressService addressService, OrderService orderService, MilestoneService milestoneService) {
        this.userService = userService;
        this.addressService = addressService;
        this.orderService = orderService;
        this.milestoneService = milestoneService;
    }

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
        String username = userDetails.getUsername();
        userService.updateUserInfoByUsername(username, userInfoInput);
        return ResponseEntity.ok(SuccessMessageConstants.PUT_USER_INFO);
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
        String username = userDetails.getUsername();
        List<AddressOverviewDTO> addresses = addressService.findUserAddresses(username);
        return ResponseEntity.ok(addresses);
    }

    @GetMapping(value = "/me/orders", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserOrderOverviews(@AuthenticationPrincipal UserDetails userDetails,
                                                          @RequestParam(value = "page", defaultValue = "1") int page) {
        String username = userDetails.getUsername();
        Pair<List<OrderOverviewDTO>, Long> ordersPair = orderService.findUserOrdersByPage(username, page);
        return ResponseEntity.ok()
                .header(HeaderConstants.TOTAL_COUNT, ordersPair.getSecond().toString())
                .body(ordersPair.getFirst());
    }

    @GetMapping(value = "/me/wish-list", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserWishList(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        List<LaptopOverviewDTO> laptops = userService.findUserWishList(username);
        return ResponseEntity.ok(laptops);
    }

    @PutMapping(value = "/me/cart", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putCurrentUserCart(@AuthenticationPrincipal UserDetails userDetails,
                                                @RequestBody Map<String, String> requestBody) {
        String cartJSON = requestBody.get("cartJSON");
        userService.updateUserCart(userDetails.getUsername(), cartJSON);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/me/cart/laptops/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putCurrentUserCart(@AuthenticationPrincipal UserDetails userDetails,
                                                @PathVariable("id") Integer laptopId) {
        userService.moveCartItemToWishList(userDetails.getUsername(), laptopId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping(value = "/me/wish-list", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putCurrentUserWishList(@AuthenticationPrincipal UserDetails userDetails,
                                                    @RequestBody Map<String, String> requestBody) {
        String listJSON = requestBody.get("listJSON");
        userService.updateUserWishList(userDetails.getUsername(), listJSON);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/me/checkout", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserCheckout(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        OrderCheckoutDTO output = userService.findCheckoutByUsername(username);
        return ResponseEntity.ok(output);
    }

    @PutMapping(value = "/me/default-address", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putCurrentUserDefaultAddressId(@RequestBody Map<String, Integer> requestBody,
                                                            @AuthenticationPrincipal UserDetails userDetails) {
        Integer addressId = requestBody.get("address_id");
        String username = userDetails.getUsername();
        userService.updateUserDefaultAddressId(username, addressId);
        return ResponseEntity.ok(SuccessMessageConstants.PUT_USER_DEFAULT_ADDRESS);
    }

    @PutMapping(value = "/me/password", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putCurrentUserPassword(@RequestBody PasswordInput passwordInput,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        passwordInput.setUsername(username);
        userService.updateUserPassword(passwordInput);
        return ResponseEntity.ok(SuccessMessageConstants.PUT_USER_PASSWORD);
    }

    @GetMapping(value = "/me/milestones", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserMilestones(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        List<MilestoneDTO> milestones = milestoneService.findUserMilestones(username);
        return ResponseEntity.ok(milestones);
    }
}