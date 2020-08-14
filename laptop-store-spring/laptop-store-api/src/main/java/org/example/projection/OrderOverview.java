package org.example.projection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.model.Order;
import org.example.model.OrderDetail;
import org.example.type.ProductType;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderOverview {
    @JsonProperty("order")
    @JsonIgnoreProperties("user")
    private Order order;

    @JsonProperty("first_product")
    private OrderDetail firstProduct;

    @JsonProperty("product_count")
    private Integer productCount;

    public static OrderOverview fromOrder(Order order) {
        List<OrderDetail> orderProducts = order.getOrderDetails().stream()
                .filter(detail -> detail.getProductType() == ProductType.LAPTOP)
                .collect(Collectors.toList());
        Integer productCount = orderProducts.stream().mapToInt(OrderDetail::getQuantity).sum();
        return OrderOverview.builder().order(order)
                .firstProduct(orderProducts.get(0))
                .productCount(productCount).build();
    }
}