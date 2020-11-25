package org.example.dto.laptop;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.constant.ImageConstants;
import org.example.util.ImageUrlUtil;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class LaptopOverviewDTO implements Serializable {

    private static final long serialVersionUID = -7579952410426942391L;

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

    @JsonProperty("ram")
    private String ramInfo;

    @JsonProperty("hard_drive")
    private String hardDriveInfo;

    @JsonProperty("image_url")
    public String getImageUrl() {
        return ImageUrlUtil.getLaptopImageUrl(id, alt, ImageConstants.LAPTOP_IMAGE_RESOLUTION);
    }
}