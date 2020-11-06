package org.example.service.api;

import org.example.dto.comment.QuestionDTO;
import org.example.input.QuestionInput;
import org.example.util.Pair;

import java.util.List;

public interface QuestionService {
    void createQuestion(QuestionInput questionInput, String username);

    Pair<List<QuestionDTO>, Long> findByProductId(Integer productId, Integer page);
}
