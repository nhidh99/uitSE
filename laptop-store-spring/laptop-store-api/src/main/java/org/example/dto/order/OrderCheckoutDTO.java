package org.example.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.constant.OrderConstants;
import org.example.util.DateUtil;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderCheckoutDTO implements Serializable {
    @JsonProperty("transport_fee")
    private Integer transportFee;

    @JsonProperty("laptop_count")
    private Integer laptopCount;

    @JsonProperty("promotion_count")
    private Integer promotionCount;

    @JsonProperty("total_price")
    private Long totalPrice;

    @JsonProperty("laptop_price")
    private Long totalLaptopPrice;

    @JsonProperty("promotion_price")
    private Long totalPromotionPrice;

    @JsonProperty("order_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate orderDate;

    @JsonProperty("delivery_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate deliveryDate;

    @JsonProperty("items")
    private List<OrderItemDTO> itemDTOs;

    public void setItemDTOs(List<OrderItemDTO> itemDTOs) {
        this.itemDTOs = itemDTOs;
        setItemCountsAndTotalPrices();
    }

    private void setItemCountsAndTotalPrices() {
        int laptopCount = 0, promotionCount = 0;
        long totalLaptopPrice = 0, totalPromotionPrice = 0;
        for (OrderItemDTO item : itemDTOs) {
            switch (item.getProductType()) {
                case LAPTOP:
                    laptopCount += item.getQuantity();
                    totalLaptopPrice += item.getTotalPrice();
                    break;
                case PROMOTION:
                    promotionCount += item.getQuantity();
                    totalPromotionPrice += item.getTotalPrice();
                default:
                    break;
            }
        }

        setLaptopCount(laptopCount);
        setTotalLaptopPrice(totalLaptopPrice);
        setPromotionCount(promotionCount);
        setTotalPromotionPrice(totalPromotionPrice);
    }
}
