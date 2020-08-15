package org.example.projection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.model.HardDrive;
import org.example.model.RAM;

public interface LaptopSummary {
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

    @JsonProperty("ram")
    @JsonIgnoreProperties({"id", "type", "bus","max_size", "detail"})
    RAM getRam();

    @JsonProperty("hard_drive")
    @JsonIgnoreProperties({"id", "detail"})
    HardDrive getHardDrive();

    @JsonProperty("avg_rating")
    Float getAvgRating();

    @JsonProperty("quantity")
    Integer getQuantity();
}
