package org.example.dto.laptop;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.dto.promotion.PromotionDTO;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LaptopDetailDTO implements Serializable {
    @JsonProperty("spec")
    private LaptopSpecDTO spec;

    @JsonProperty("image_ids")
    private List<Integer> imageIds;

    @JsonProperty("promotions")
    private List<PromotionDTO> promotions;

    @JsonProperty("suggestions")
    private List<LaptopOverviewDTO> suggestions;
}