package org.example.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import org.example.constant.OrderConstants;
import org.example.util.DateUtil;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Getter
@Builder
public class OrderCheckoutDTO {
    @JsonProperty("transport_fee")
    private final Integer transportFee;

    @JsonProperty("laptop_count")
    private final Integer laptopCount;

    @JsonProperty("promotion_count")
    private final Integer promotionCount;

    @JsonProperty("total_price")
    private final Long totalPrice;

    @JsonProperty("laptop_price")
    private final Long totalLaptopPrice;

    @JsonProperty("promotion_price")
    private final Long totalPromotionPrice;

    @JsonProperty("order_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private final LocalDate orderDate;

    @JsonProperty("delivery_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private final LocalDate deliveryDate;

    @JsonProperty("items")
    private final List<OrderItemDTO> items;

    public static OrderCheckoutDTO fromItems(List<OrderItemDTO> items) {
        LocalDate orderDate = LocalDate.now(ZoneId.of(OrderConstants.DELIVERY_TIME_ZONE));
        LocalDate deliveryDate = DateUtil.addWorkingDays(orderDate, OrderConstants.DELIVERY_DAYS);
        int laptopCount = 0, promotionCount = 0;
        long totalLaptopPrice = 0, totalPromotionPrice = 0;

        for (OrderItemDTO item : items) {
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

        return OrderCheckoutDTO.builder()
                .transportFee(items.isEmpty() ? 0 : OrderConstants.TRANSPORT_FEE)
                .totalPrice(items.isEmpty() ? 0 : totalLaptopPrice + OrderConstants.TRANSPORT_FEE)
                .orderDate(orderDate).deliveryDate(deliveryDate)
                .laptopCount(laptopCount).promotionCount(promotionCount)
                .items(items).totalLaptopPrice(totalLaptopPrice)
                .totalPromotionPrice(totalPromotionPrice).build();
    }
}
