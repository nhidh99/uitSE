package org.example.dto.rating;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class RatingDTO implements Serializable {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("point")
    private Integer point;

    @JsonProperty("detail")
    private String detail;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "HH:mm dd/MM/yyyy")
    private LocalDateTime createdAt;

    @JsonProperty("author_name")
    private String authorName;
}
