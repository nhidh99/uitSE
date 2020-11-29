package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RatingInput {
    @JsonProperty("point")
    private Integer point;

    @JsonProperty("detail")
    private String detail;

    @JsonProperty("product_id")
    private Integer productId;
}
