package org.example.projection;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface LaptopRowData {
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

    @JsonProperty("avg_rating")
    Float getAvgRating();

    @JsonProperty("quantity")
    Integer getQuantity();

    @JsonProperty("ram")
    RAMData getRam();

    @JsonProperty("hard_drive")
    HardDriveData getHardDrive();

    interface RAMData {
        @JsonProperty("size")
        Integer getSize();
    }

    interface HardDriveData {
        @JsonProperty("type")
        String getType();

        @JsonProperty("size")
        Integer getSize();
    }
}
