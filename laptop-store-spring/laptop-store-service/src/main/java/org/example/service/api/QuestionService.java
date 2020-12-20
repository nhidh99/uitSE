package org.example.service.api;

import org.example.dto.question.QuestionDTO;
import org.example.dto.question.QuestionSummaryDTO;
import org.example.dto.reply.CommonReplyDTO;
import org.example.input.form.QuestionInput;
import org.example.type.FeedbackStatus;
import org.example.util.Pair;

import java.util.List;

public interface QuestionService {
    void createQuestion(QuestionInput questionInput, String username);

    Pair<List<QuestionDTO>, Long> findByProductId(Integer productId, Integer page);

    Pair<List<QuestionSummaryDTO>, Long> findByStatus(FeedbackStatus status, int page);

    List<CommonReplyDTO> findMoreRepliesById(Integer questionId);
}