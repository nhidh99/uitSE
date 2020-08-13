package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SocialMediaInput {
    @JsonProperty("id")
    private String id;
}
