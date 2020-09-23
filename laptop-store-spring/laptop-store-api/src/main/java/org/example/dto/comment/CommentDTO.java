package org.example.dto.comment;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.model.User;

import java.time.LocalDate;

public class CommentDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonIgnore
    private User user;

    @JsonProperty("question")
    private String question;

    @JsonProperty("comment_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate commentDate;

    @JsonProperty("user")
    public String getUserFullName() {
        return user.getName();
    }
}