package org.example.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.OrderStatus;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class OrderTrackDTO implements Serializable {
    private OrderStatus status;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "HH:mm dd/MM/yyyy")
    private LocalDateTime createdAt;

    @JsonProperty("status")
    public String getStatus() {
        switch (status) {
            case PENDING:
                return "Đơn hàng đã được tạo";
            case RECEIVED:
                return "Laptop Store đã tiếp nhận đơng hàng";
            case PACKAGED:
                return "Các sản phẩm đã được đóng gói";
            case DELIVERING:
                return "Đơn hàng đang được vận chuyển";
            case DELIVERED:
                return "Đã giao hàng";
            case CANCELED:
                return "Đơn hàng đã bị hủy";
            default:
                return null;
        }
    }
}
