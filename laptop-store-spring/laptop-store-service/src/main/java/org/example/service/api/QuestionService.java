package org.example.service.api;

import org.example.dto.comment.QuestionDTO;
import org.example.input.QuestionInput;
import org.example.type.FeedbackStatus;
import org.example.util.Pair;

import java.util.List;

public interface QuestionService {
    void createQuestion(QuestionInput questionInput, String username);

    Pair<List<QuestionDTO>, Long> findByProductId(Integer productId, Integer page);

    Pair<List<QuestionDTO>, Long> findByStatus(FeedbackStatus status, int page);
}