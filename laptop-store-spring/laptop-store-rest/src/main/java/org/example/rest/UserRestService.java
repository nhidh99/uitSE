package org.example.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.model.*;
import org.example.projection.LaptopOverview;
import org.example.projection.OrderOverview;
import org.example.service.api.AddressService;
import org.example.service.api.LaptopService;
import org.example.service.api.OrderService;
import org.example.service.api.UserService;
import org.example.type.SocialMediaType;
import org.springframework.beans.factory.annotation.Autowired;
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
        List<Address> addresses = addressService.findByUsername(username);
        return ResponseEntity.ok(addresses);
    }

    @GetMapping(value = "/me/orders", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUserOrderOverviews(@AuthenticationPrincipal UserDetails userDetails,
                                                          @RequestParam(value = "page", defaultValue = "1") int page) {
        String username = userDetails.getUsername();
        List<OrderOverview> orders = orderService.findOverviewsByUsernameAndPage(username, page);
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
            List<Integer> laptopIds = om.readValue(user.getWishList(), new TypeReference<List<Integer>>() {});
            List<LaptopOverview> laptops = laptopService.findOverviewsByIds(laptopIds);
            return ResponseEntity.ok(laptops);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}