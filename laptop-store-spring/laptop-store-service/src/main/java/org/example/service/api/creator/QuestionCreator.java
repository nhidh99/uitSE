package org.example.service.api.creator;

import org.example.dto.question.QuestionDTO;
import org.example.input.form.QuestionInput;
import org.example.model.Question;

public interface QuestionCreator {
    Question createQuestion(QuestionInput questionInput);

    QuestionDTO createQuestionDTO(Question question);
}
