package org.example.input.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.type.GenderType;

@Data
public class UserInfoInput {
    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone")
    private String phone;

    @JsonProperty("gender")
    private GenderType gender;
}
