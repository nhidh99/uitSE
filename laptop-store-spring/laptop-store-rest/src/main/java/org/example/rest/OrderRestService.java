package org.example.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.constant.ErrorMessageConstants;
import org.example.dto.order.OrderDetailDTO;
import org.example.model.Order;
import org.example.service.api.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@PreAuthorize("isAuthenticated()")
public class OrderRestService {

    private final OrderService orderService;

    @Autowired
    public OrderRestService(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getOrderById(@AuthenticationPrincipal UserDetails userDetails,
                                          @PathVariable("id") Integer orderId) {
        String username = userDetails.getUsername();
        OrderDetailDTO order = orderService.findOrderDTOByOrderIdAndUsername(orderId, username);
        return ResponseEntity.ok(order);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> postOrder(@AuthenticationPrincipal UserDetails userDetails,
                                       @RequestBody Map<String, Integer> requestBody) throws JsonProcessingException {
        Integer addressId = requestBody.get("addressId");
        String username = userDetails.getUsername();
        Order order = orderService.createOrder(addressId, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(order.getId());
    }
}
