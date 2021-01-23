package org.example.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.constant.HeaderConstants;
import org.example.dto.order.OrderDetailDTO;
import org.example.dto.order.OrderSummaryDTO;
import org.example.input.query.OrderSearchInput;
import org.example.service.api.service.OrderService;
import org.example.type.OrderStatus;
import org.example.type.SearchOrderType;
import org.example.type.SearchTargetType;
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
@RequestMapping("/api/orders")
@PreAuthorize("isAuthenticated()")
public class OrderRestService {

    private final OrderService orderService;

    @Autowired
    public OrderRestService(OrderService orderService) {
        this.orderService = orderService;
    }

    @PreAuthorize("hasAuthority(T(org.example.type.RoleType).ADMIN)")
    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOrders(
            @RequestParam(value = "query", defaultValue = "") String query,
            @RequestParam(value = "target", defaultValue = "ID") SearchTargetType target,
            @RequestParam(value = "order", defaultValue = "DESC") SearchOrderType order,
            @RequestParam(value = "status", defaultValue = "PENDING") OrderStatus status,
            @RequestParam(value = "page", defaultValue = "1") Integer page) {
        OrderSearchInput search = OrderSearchInput.builder().query(query).target(target)
                .status(status).order(order).page(page).build();
        Pair<List<OrderSummaryDTO>, Long> output = orderService.findOrdersBySearch(search);
        return ResponseEntity.ok()
                .header(HeaderConstants.TOTAL_COUNT, output.getSecond().toString())
                .body(output.getFirst());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOrderById(@PathVariable("id") Integer orderId) {
        OrderDetailDTO order = orderService.findUserOrderDetailByOrderId(orderId);
        return ResponseEntity.ok(order);
    }

    @PostMapping(value = "/{id}/cancel", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> postCancelOrderById(@PathVariable("id") Integer orderId) {
        orderService.cancelOrderByIdAndUsername(orderId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> postOrder(@RequestBody Map<String, Integer> requestBody) throws JsonProcessingException {
        Integer addressId = requestBody.get("addressId");
        Integer orderId = orderService.insertUserOrder(addressId);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderId);
    }
}
