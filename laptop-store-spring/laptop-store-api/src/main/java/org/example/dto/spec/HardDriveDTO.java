package org.example.dto.spec;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.type.HardDriveType;

@Data
public class HardDriveDTO {
    @JsonProperty("type")
    private HardDriveType type;

    @JsonProperty("size")
    private Integer size;

    @JsonProperty("detail")
    private String detail;
}
