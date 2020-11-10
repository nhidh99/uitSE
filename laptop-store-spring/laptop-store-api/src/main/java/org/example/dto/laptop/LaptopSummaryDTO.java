package org.example.dto.laptop;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.constant.ResolutionConstants;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class LaptopSummaryDTO implements Serializable {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonIgnore
    private String alt;

    @JsonProperty("unit_price")
    private Long unitPrice;

    @JsonProperty("avg_rating")
    private Float avgRating;

    @JsonProperty("image_url")
    public String getImageUrl() {
        return new StringBuilder("/api/images/")
                .append(ResolutionConstants.LAPTOP_THUMBNAIL_RESOLUTION)
                .append("/laptops/").append(id)
                .append("/").append(alt)
                .append(".jpg").toString();
    }
}