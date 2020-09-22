package org.example.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.type.OrderStatus;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class OrderOverviewDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("order_status")
    private OrderStatus orderStatus;

    @JsonProperty("order_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate orderDate;

    @JsonProperty("total_price")
    private Long totalPrice;

    @JsonProperty("describe")
    private String describe;
}