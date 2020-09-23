package org.example.rest;

import org.example.constant.ErrorMessageConstants;
import org.example.dto.order.OrderDetailDTO;
import org.example.service.api.OrderService;
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
        try {
            String username = userDetails.getUsername();
            OrderDetailDTO order = orderService.findOrderDTOByOrderIdAndUsername(orderId, username);
            return ResponseEntity.ok(order);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessageConstants.SERVER_ERROR);
        }
    }
}
