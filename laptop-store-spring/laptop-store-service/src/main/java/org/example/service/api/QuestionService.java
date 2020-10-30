package org.example.service.api;

import org.example.input.QuestionInput;

public interface QuestionService {
    void createQuestion(QuestionInput questionInput, String username);
}
