package org.example.dto.comment;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
public class QuestionDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("question")
    private String question;

    @JsonProperty("comment_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate commentDate;

    @JsonProperty("user")
    private String userFullName;
}