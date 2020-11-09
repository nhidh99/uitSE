package org.example.dto.laptop;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class LaptopOverviewDTO implements Serializable {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("alt")
    private String alt;

    @JsonProperty("unit_price")
    private Long unitPrice;

    @JsonProperty("discount_price")
    private Long discountPrice;

    @JsonProperty("avg_rating")
    private Float avgRating;

    @JsonProperty("ram")
    private String ramInfo;

    @JsonProperty("hard_drive")
    private String hardDriveInfo;
}
