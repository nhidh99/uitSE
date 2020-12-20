package org.example.input.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ReplyInput {
    @JsonProperty("reply")
    private String reply;
}
