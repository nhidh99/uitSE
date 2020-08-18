package org.example.rest;

import org.example.model.Order;
import org.example.model.OrderDetail;
import org.example.service.api.OrderDetailService;
import org.example.service.api.OrderService;
import org.example.type.ProductType;
import org.example.type.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/orders")
@PreAuthorize("isAuthenticated()")
public class OrderRestService {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getOrderById(@AuthenticationPrincipal UserDetails userDetails,
                                          @PathVariable("id") Integer id) {

        boolean isUserRequest = orderService.existByIdAndUsername(id, userDetails.getUsername());
        boolean isAdminRequest = userDetails.getAuthorities().contains(RoleType.ADMIN);
        if (!(isUserRequest || isAdminRequest)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<Order> optOrder = orderService.findById(id);
        if (!optOrder.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        Order order = optOrder.get();
        List<OrderDetail> orderDetails = orderDetailService.findByOrderId(id);

        List<OrderDetail> promotions = new LinkedList<>();
        List<OrderDetail> products = new LinkedList<>();
        int promotionQuantity = 0, productQuantity = 0;
        long promotionTotalPrice = 0, productTotalPrice = 0;

        for (OrderDetail detail : orderDetails) {
            if (detail.getProductType() == ProductType.PROMOTION) {
                promotions.add(detail);
                promotionQuantity += detail.getQuantity();
                promotionTotalPrice += detail.getTotalPrice();
            } else {
                products.add(detail);
                productQuantity += detail.getQuantity();
                productTotalPrice += detail.getTotalPrice();
            }
        }

        Map<String, Object> output = new HashMap<>();
        output.put("order", order);
        output.put("promotions", promotions);
        output.put("products", products);
        output.put("promotion_quantity", promotionQuantity);
        output.put("product_quantity", productQuantity);
        output.put("promotion_price", promotionTotalPrice);
        output.put("product_price", productTotalPrice);
        return ResponseEntity.ok(output);
    }
}
