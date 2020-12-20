package org.example.input.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CommentInput {
    @JsonProperty("question")
    private String question;
}
