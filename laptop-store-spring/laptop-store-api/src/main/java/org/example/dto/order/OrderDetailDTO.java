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

    @JsonIgnore
    private OrderStatus status;

    @JsonIgnore
    private String addressNum;

    @JsonIgnore
    private String street;

    @JsonIgnore
    private Ward ward;

    @JsonIgnore
    private District district;

    @JsonIgnore
    private City city;

    @JsonProperty("items")
    private List<OrderItemDTO> items;

    @JsonProperty("tracks")
    private List<OrderTrackDTO> tracks;

    @JsonProperty("order_location")
    public String getOrderLocation() {
        return new StringBuilder(addressNum)
                .append(" ").append(street)
                .append(", ").append(ward.getName())
                .append(", ").append(district.getName())
                .append(", ").append(city.getName()).toString();
    }

    @JsonProperty("progress_step")
    public int getProgressStep() {
        return status.getProgressStep();
    }
}
