package org.example.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.model.OrderDetail;
import org.example.model.User;
import org.example.type.OrderStatus;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "\"order\"")
@Immutable
public class OrderOverviewDTO {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @JsonProperty("order_status")
    private OrderStatus orderStatus;

    @Column(name = "order_date")
    @JsonProperty("order_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate orderDate;

    @Column(name = "total_price")
    @JsonProperty("total_price")
    private Long totalPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private List<OrderDetail> orderDetails;

    @JsonIgnore
    @Formula("(SELECT CONCAT(od.quantity, ' ', od.product_name) " +
            "FROM order_detail od " +
            "WHERE od.order_id = id " +
            "AND od.product_type = 'LAPTOP' LIMIT 1)")
    private String firstProductInfo;

    @JsonIgnore
    @Formula("(SELECT SUM(od.quantity) " +
            "FROM order_detail od " +
            "WHERE od.order_id = id " +
            "AND od.product_type = 'LAPTOP')")
    private int productCount;

    @Transient
    @JsonProperty("describe")
    @Getter(AccessLevel.NONE)
    private String describe;


    @Builder
    public OrderOverviewDTO(Integer id, OrderStatus orderStatus, LocalDate orderDate, Long totalPrice) {
        this.id = id;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
        this.totalPrice = totalPrice;
    }

    @JsonProperty("describe")
    public String getDescribe() {
        int firstProductQuantity = Integer.parseInt(firstProductInfo.split(" ")[0]);
        int otherProductsQuantity = productCount - firstProductQuantity;
        return otherProductsQuantity == 0 ? firstProductInfo
                : String.format("%s và %d sản phẩm khác", firstProductInfo, otherProductsQuantity);
    }
}