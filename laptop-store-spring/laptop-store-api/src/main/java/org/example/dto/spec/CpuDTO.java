package org.example.dto.spec;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.type.CPUType;

import java.io.Serializable;

@Data
public class CpuDTO implements Serializable {
    @JsonProperty("type")
    private CPUType type;

    @JsonProperty("detail")
    private String detail;

    @JsonProperty("speed")
    private Float speed;

    @JsonProperty("max_speed")
    private String maxSpeed;
}
