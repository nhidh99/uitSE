package org.example.model;

import lombok.*;
import org.example.dto.order.OrderItemDTO;
import org.example.dto.order.OrderTrackDTO;
import org.example.type.OrderStatus;
import org.example.util.DateUtil;
import org.example.util.ModelMapperUtil;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedList;
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

    @Column(name = "order_date")
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

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<OrderItem> items;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = {CascadeType.ALL}, orphanRemoval = true)
    @OrderBy("id DESC")
    private List<OrderTrack> tracks;

    @Formula("(SELECT CONCAT(i.quantity, ' ', i.product_name) " +
            "FROM order_item i " +
            "WHERE i.order_id = id " +
            "AND i.product_type = 'LAPTOP' LIMIT 1)")
    @Getter
    private String firstProductInfo;

    @Formula("(SELECT SUM(i.quantity) " +
            "FROM order_item i " +
            "WHERE i.order_id = id " +
            "AND i.product_type = 'LAPTOP')")
    @Getter(AccessLevel.NONE)
    private int productCount;

    public String getOrderLocation() {
        return new StringBuilder(addressNum)
                .append(" ").append(street)
                .append(", ").append(ward.getName())
                .append(", ").append(district.getName())
                .append(", ").append(city.getName()).toString();
    }

    public String getDescribe() {
        int firstProductQuantity = Integer.parseInt(firstProductInfo.split(" ")[0]);
        if (productCount == firstProductQuantity) {
            return firstProductInfo;
        }
        return new StringBuilder(firstProductInfo).append(" và ")
                .append(productCount - firstProductQuantity)
                .append(" sản phẩm khác").toString();
    }

    public void addTrack(OrderTrack track) {
        tracks.add(track);
    }

    public void addTrack(OrderStatus status) {
        if (tracks == null) {
            tracks = new LinkedList<>();
        }
        LocalDateTime now = DateUtil.getCurrentLocalDateTime();
        OrderTrack track = OrderTrack.builder().order(this)
                .status(status).createdAt(now).build();
        tracks.add(track);
    }

    public List<OrderItemDTO> getItemDTOs() {
        return ModelMapperUtil.mapList(items, OrderItemDTO.class);
    }

    public List<OrderTrackDTO> getTrackDTOs() {
        return ModelMapperUtil.mapList(tracks, OrderTrackDTO.class);
    }
}