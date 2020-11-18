package org.example.dto.rating;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RatingSummaryDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("point")
    private Integer point;

    @JsonProperty("detail")
    private String detail;

    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("author_name")
    private String authorName;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "HH:mm dd/MM/yyyy")
    private LocalDateTime createdAt;
}
