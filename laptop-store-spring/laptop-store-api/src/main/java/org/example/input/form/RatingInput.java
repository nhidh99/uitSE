package org.example.input.form;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
