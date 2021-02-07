package org.example.service.api.service;

import org.example.dto.question.QuestionDTO;
import org.example.dto.question.QuestionSummaryDTO;
import org.example.dto.reply.ReplyDTO;
import org.example.input.form.QuestionInput;
import org.example.type.FeedbackStatus;
import org.example.util.Pair;

import java.util.List;

public interface QuestionService {
    void insertQuestion(QuestionInput questionInput);

    Pair<List<QuestionDTO>, Long> findAndCountQuestionsByProductId(Integer productId, Integer page);

    Pair<List<QuestionSummaryDTO>, Long> findQuestionsByStatus(FeedbackStatus status, int page);

    List<ReplyDTO> findMoreRepliesById(Integer questionId);
}