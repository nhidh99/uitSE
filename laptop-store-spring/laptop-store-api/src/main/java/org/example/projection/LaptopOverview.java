package org.example.projection;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.model.Promotion;

import java.util.List;

public interface LaptopOverview {
    @JsonProperty("id")
    Integer getId();

    @JsonProperty("name")
    String getName();

    @JsonProperty("alt")
    String getAlt();

    @JsonProperty("unit_price")
    Long getUnitPrice();

    @JsonProperty("discount_price")
    Long getDiscountPrice();

    @JsonProperty("promotions")
    @JsonIgnoreProperties({"id", "alt", "price", "quantity"})
    List<Promotion> getPromotions();
}