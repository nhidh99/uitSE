package org.example.rest;

import org.example.constant.HeaderConstants;
import org.example.constant.SuccessMessageConstants;
import org.example.dto.question.QuestionDTO;
import org.example.dto.question.QuestionSummaryDTO;
import org.example.input.QuestionInput;
import org.example.service.api.QuestionService;
import org.example.type.FeedbackStatus;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@PreAuthorize("permitAll()")
public class QuestionRestService {

    private final QuestionService questionService;

    @Autowired
    public QuestionRestService(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postQuestion(@AuthenticationPrincipal UserDetails userDetails,
                                          @Valid @RequestBody QuestionInput questionInput) {
        questionService.createQuestion(questionInput, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(SuccessMessageConstants.QUESTION_CREATED);
    }

    @PreAuthorize("permitAll()")
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, params = "product_id")
    public ResponseEntity<?> getQuestionByProductId(@RequestParam("product_id") Integer productId,
                                                    @RequestParam(value = "page", defaultValue = "1") Integer page) {
        Pair<List<QuestionDTO>, Long> questionsAndCount = questionService.findByProductId(productId, page);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HeaderConstants.TOTAL_COUNT, questionsAndCount.getSecond().toString())
                .body(questionsAndCount.getFirst());
    }

    @PreAuthorize("hasAuthority(T(org.example.type.RoleType).ADMIN)")
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, params = "status")
    public ResponseEntity<?> getQuestionByStatus(
            @RequestParam(value = "status", defaultValue = "PENDING") FeedbackStatus status,
            @RequestParam(value = "page", defaultValue = "1") Integer page) {
        Pair<List<QuestionSummaryDTO>, Long> questionsAndCount = questionService.findByStatus(status, page);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HeaderConstants.TOTAL_COUNT, questionsAndCount.getSecond().toString())
                .body(questionsAndCount.getFirst());
    }
}