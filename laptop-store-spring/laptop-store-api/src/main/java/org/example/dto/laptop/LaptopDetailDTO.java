package org.example.dto.laptop;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.dto.comment.CommentDTO;
import org.example.dto.rating.RatingDTO;
import org.example.model.Promotion;

import java.util.List;

@Data
@NoArgsConstructor
public class LaptopDetailDTO {
    @JsonProperty("specs")
    private LaptopSpecDTO specs;

    @JsonProperty("image_ids")
    private List<Integer> imageIds;

    @JsonProperty("promotions")
    private List<Promotion> promotions;

    @JsonProperty("suggestions")
    private List<LaptopOverviewDTO> suggestions;

    @JsonProperty("comments")
    private List<CommentDTO> comments;

    @JsonProperty("ratings")
    private List<RatingDTO> ratings;
}