package org.example.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class OrderDetailDTO {
    @JsonProperty("transport_fee")
    private Integer transportFee;

    @JsonProperty("total_price")
    private Long totalPrice;

    @JsonProperty("receiver_name")
    private String receiverName;

    @JsonProperty("receiver_phone")
    private String receiverPhone;

    @JsonProperty("order_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate orderDate;

    @JsonProperty("delivery_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate deliveryDate;

    @JsonProperty("order_location")
    private String orderLocation;

    @JsonProperty("items")
    private List<OrderItemDTO> items;
}
