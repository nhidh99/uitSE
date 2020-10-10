package org.example.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.type.OrderStatus;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"order\"")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "transport_fee")
    private Integer transportFee;

    @Column(name = "total_price")
    private Long totalPrice;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name="order_date")
    private LocalDate orderDate;

    @Column(name = "delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "receiver_name")
    private String receiverName;

    @Column(name = "receiver_phone")
    private String receiverPhone;

    @Column(name = "address_num")
    private String addressNum;

    @Column(name = "street")
    private String street;

    @OneToOne
    @JoinColumn(name = "ward_id")
    private Ward ward;

    @OneToOne
    @JoinColumn(name = "district_id")
    private District district;

    @OneToOne
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<OrderItem> orderItems;

    @Formula("(SELECT CONCAT(i.quantity, ' ', i.product_name) " +
            "FROM order_item i " +
            "WHERE i.order_id = id " +
            "AND i.product_type = 'LAPTOP' LIMIT 1)")
    @Getter(AccessLevel.NONE)
    private String firstProductInfo;

    @Formula("(SELECT SUM(i.quantity) " +
            "FROM order_item i " +
            "WHERE i.order_id = id " +
            "AND i.product_type = 'LAPTOP')")
    @Getter(AccessLevel.NONE)
    private int productCount;
}