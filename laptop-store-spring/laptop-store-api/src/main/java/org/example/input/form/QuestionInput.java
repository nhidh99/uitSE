package org.example.input.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.constant.ErrorMessageConstants;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class QuestionInput {
    @NotNull(message = ErrorMessageConstants.BAD_REQUEST)
    @JsonProperty("product_id")
    private Integer productId;

    @NotBlank(message = ErrorMessageConstants.EMPTY_QUESTION)
    @JsonProperty("question")
    private String question;

    public void setQuestion(String question) {
        this.question = question.trim();
    }
}
