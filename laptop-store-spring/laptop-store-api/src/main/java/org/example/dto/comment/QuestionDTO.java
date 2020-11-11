package org.example.dto.comment;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class QuestionDTO implements Serializable {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("question")
    private String question;

    @JsonProperty("author_name")
    private String authorName;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "HH:mm dd/MM/yyyy")
    private LocalDateTime createdAt;
}