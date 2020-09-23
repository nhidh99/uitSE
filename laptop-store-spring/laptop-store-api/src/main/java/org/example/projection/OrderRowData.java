package org.example.projection;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.type.OrderStatus;
import org.example.type.ProductType;

import java.time.LocalDate;
import java.util.List;

public interface OrderRowData {
    @JsonProperty("id")
    Integer getId();

    @JsonProperty("order_date")
    LocalDate getOrderDate();

    @JsonProperty("total_price")
    Long getTotalPrice();

    @JsonProperty("status")
    OrderStatus getStatus();

    @JsonIgnore
    List<OrderDetailData> getOrderItems();

    interface OrderDetailData {
        @JsonIgnore
        ProductType getProductType();

        @JsonProperty("quantity")
        Integer getQuantity();

        @JsonProperty("product_name")
        String getProductName();
    }

    @JsonProperty("product_count")
    default Integer getProductCount() {
        return getOrderItems().stream()
                .filter(detail -> detail.getProductType() == ProductType.LAPTOP)
                .mapToInt(OrderDetailData::getQuantity).sum();
    }

    @JsonProperty("first_product")
    default OrderDetailData getFirstProduct() {
        return getOrderItems().stream()
                .filter(detail -> detail.getProductType() == ProductType.LAPTOP)
                .findFirst().get();
    }
}
