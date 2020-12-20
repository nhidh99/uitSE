package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.type.ProductType;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonIgnore
    private Integer id;

    @Column(name = "product_id")
    @JsonProperty("product_id")
    private Integer productId;

    @Column(name = "product_name")
    @JsonProperty("product_name")
    private String productName;

    @Column(name="product_type")
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private ProductType productType;

    @Column(name = "quantity")
    @JsonProperty("quantity")
    private Integer quantity;

    @Column(name = "unit_price")
    @JsonProperty("unit_price")
    private Long unitPrice;

    @Column(name = "total_price")
    @JsonProperty("total_price")
    private Long totalPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    @ToString.Exclude
    private Order order;

    public boolean isLaptopItem() {
        return productType == ProductType.LAPTOP;
    }

    public boolean isPromotionItem() {
        return productType == ProductType.PROMOTION;
    }

    public static OrderItem fromLaptop(Laptop laptop, int quantity) {
        return new OrderItem() {{
            long unitPrice = laptop.getUnitPrice();
            long totalPrice = unitPrice * quantity;
            setProductId(laptop.getId());
            setProductName(laptop.getName());
            setProductType(ProductType.LAPTOP);
            setUnitPrice(unitPrice);
            setTotalPrice(totalPrice);
            setQuantity(quantity);
        }};
    }

    public static OrderItem fromPromotion(Promotion promotion, int quantity) {
        return new OrderItem() {{
            long unitPrice = promotion.getPrice();
            long totalPrice = unitPrice * quantity;
            setProductId(promotion.getId());
            setProductName(promotion.getName());
            setProductType(ProductType.PROMOTION);
            setUnitPrice(unitPrice);
            setTotalPrice(totalPrice);
            setQuantity(quantity);
        }};
    }
}
