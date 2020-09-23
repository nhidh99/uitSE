package org.example.dto.rating;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.model.User;

import java.time.LocalDate;

public class RatingDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonIgnore
    private User user;

    @JsonProperty("rating")
    private Integer rating;

    @JsonProperty("comment_title")
    private String commentTitle;

    @JsonProperty("comment_detail")
    private String commentDetail;

    @JsonProperty("rating_date")
    private LocalDate ratingDate;

    @JsonProperty("user")
    public String getUserFullName() {
        return user.getName();
    }
}
