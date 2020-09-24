package org.example.dto.spec;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.type.RAMType;

@Data
public class RamDTO {
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
