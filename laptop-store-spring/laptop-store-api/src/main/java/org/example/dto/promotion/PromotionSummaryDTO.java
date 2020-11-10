package org.example.dto.promotion;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.constant.ResolutionConstants;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class PromotionSummaryDTO implements Serializable {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonIgnore
    private String alt;

    @JsonProperty("price")
    private Long price;

    @JsonProperty("image_url")
    public String getImageUrl() {
        return new StringBuilder("/api/images/")
                .append(ResolutionConstants.PROMOTION_IMAGE_RESOLUTION)
                .append("/promotions/").append(id)
                .append("/").append(alt)
                .append(".jpg").toString();
    }
}