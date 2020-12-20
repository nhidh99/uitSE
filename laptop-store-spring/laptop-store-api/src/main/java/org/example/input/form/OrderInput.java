package org.example.input.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OrderInput {
    @JsonProperty("addressId")
    private Integer addressId;

    @JsonProperty("cartJSON")
    private String cartJSON;
}