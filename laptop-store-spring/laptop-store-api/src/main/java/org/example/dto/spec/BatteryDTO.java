package org.example.dto.spec;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.type.BatteryType;

import java.io.Serializable;

@Data
public class BatteryDTO implements Serializable {
    @JsonProperty("type")
    private BatteryType type;

    @JsonProperty("detail")
    private String detail;

    @JsonProperty("adapter")
    private String adapter;
}
