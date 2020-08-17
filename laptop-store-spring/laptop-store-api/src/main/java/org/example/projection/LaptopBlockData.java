package org.example.projection;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public interface LaptopBlockData {
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
    List<PromotionData> getPromotions();

    interface PromotionData {
        @JsonProperty("name")
        String getName();
    }
}