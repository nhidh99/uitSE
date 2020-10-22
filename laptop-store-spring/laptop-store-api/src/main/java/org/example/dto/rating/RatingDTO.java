package org.example.dto.rating;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RatingDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("rating")
    private Integer rating;

    @JsonProperty("comment_title")
    private String commentTitle;

    @JsonProperty("comment_detail")
    private String commentDetail;

    @JsonProperty("rating_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ratingDate;

    @JsonProperty("user")
    private String userFullName;

}
