package org.example.dto.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.ProductType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    @JsonProperty("id")
    private Integer productId;

    @JsonProperty("name")
    private String productName;

    @JsonProperty("type")
    private ProductType productType;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonProperty("unit_price")
    private Long unitPrice;

    @JsonProperty("total_price")
    public Long getTotalPrice() {
        return quantity * unitPrice;
    }
}
