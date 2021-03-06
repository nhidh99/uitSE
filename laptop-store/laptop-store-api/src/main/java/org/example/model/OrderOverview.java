package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
}