package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CommentInput {
    @JsonProperty("question")
    private String question;
}
