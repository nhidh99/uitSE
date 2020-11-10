package org.example.dto.spec;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.type.RAMType;

import java.io.Serializable;

@Data
public class RamDTO implements Serializable {
    @JsonProperty("size")
    private Integer size;

    @JsonProperty("max_size")
    private Integer maxSize;

    @JsonProperty("type")
    private RAMType type;

    @JsonProperty("bus")
    private Integer bus;

    @JsonProperty("detail")
    private String detail;
}
