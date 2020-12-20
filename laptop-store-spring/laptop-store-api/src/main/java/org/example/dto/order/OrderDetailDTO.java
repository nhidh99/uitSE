package org.example.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.model.City;
import org.example.model.District;
import org.example.model.Ward;
import org.example.type.OrderStatus;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class OrderDetailDTO implements Serializable {
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

    @JsonIgnore
    private OrderStatus status;

    @JsonIgnore
    private String addressNum;

    @JsonIgnore
    private String street;

    @JsonProperty("items")
    private List<OrderItemDTO> itemDTOs;

    @JsonProperty("tracks")
    private List<OrderTrackDTO> trackDTOs;

    @JsonProperty("order_location")
    private String orderLocation;

    @JsonProperty("progress_step")
    public int getProgressStep() {
        return status.getProgressStep();
    }
}
