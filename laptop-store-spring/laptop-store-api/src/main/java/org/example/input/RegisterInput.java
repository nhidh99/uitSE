package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.type.GenderType;

@Data
public class RegisterInput {
    @JsonProperty("username")
    private String username;

    @JsonProperty("password")
    private String password;

    @JsonProperty("confirm")
    private String confirm;

    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone")
    private String phone;

    @JsonProperty("gender")
    private GenderType gender;
}
