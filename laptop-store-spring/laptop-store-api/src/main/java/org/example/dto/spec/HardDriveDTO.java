package org.example.dto.spec;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.type.HardDriveType;

import java.io.Serializable;

@Data
public class HardDriveDTO implements Serializable {
    @JsonProperty("type")
    private HardDriveType type;

    @JsonProperty("size")
    private Integer size;

    @JsonProperty("detail")
    private String detail;
}
