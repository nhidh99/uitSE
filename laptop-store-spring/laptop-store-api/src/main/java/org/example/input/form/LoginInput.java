package org.example.input.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LoginInput {
    @JsonProperty("username")
    private String username;

    @JsonProperty("password")
    private String password;
}
