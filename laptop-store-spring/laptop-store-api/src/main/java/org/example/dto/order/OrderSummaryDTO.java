package org.example.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.OrderStatus;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderSummaryDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("receiver_name")
    private String receiverName;

    @JsonProperty("receiver_phone")
    private String receiverPhone;

    @JsonIgnore
    private OrderStatus status;

    @JsonProperty("order_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate orderDate;

    @JsonProperty("total_price")
    private Long totalPrice;

    @JsonProperty("order_location")
    private String orderLocation;

    @JsonProperty("order_status")
    private String getStatus() {
        return status.toString();
    }
}
