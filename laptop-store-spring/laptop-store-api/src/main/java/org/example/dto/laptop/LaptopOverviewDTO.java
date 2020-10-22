package org.example.dto.laptop;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.model.HardDrive;
import org.example.model.RAM;

@Data
@NoArgsConstructor
public class LaptopOverviewDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("alt")
    private String alt;

    @JsonProperty("unit_price")
    private Long unitPrice;

    @JsonProperty("discount_price")
    private Long discountPrice;

    @JsonProperty("avg_rating")
    private Float avgRating;

    @JsonIgnore
    private RAM ram;

    @JsonIgnore
    private HardDrive hardDrive;

    @JsonProperty("ram")
    public String getRamInfo() {
        return ram.getSize().toString().concat("GB");
    }

    @JsonProperty("hard_drive")
    public String getHardDriveInfo() {
        Integer size = hardDrive.getSize();
        StringBuilder sb = new StringBuilder(hardDrive.getType().name());
        if (size >= 1024) {
            return sb.append(" ").append(size / 1024).append("TB").toString();
        }
        return sb.append(" ").append(size).append("GB").toString();
    }
}
