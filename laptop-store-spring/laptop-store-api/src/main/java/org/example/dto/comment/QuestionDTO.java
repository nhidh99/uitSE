package org.example.dto.comment;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class QuestionDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("question")
    private String question;

    @JsonProperty("comment_date")
    @JsonFormat(pattern = "HH:mm dd/MM/yyyy")
    private LocalDateTime commentDate;

    @JsonProperty("user")
    private String userFullName;
}