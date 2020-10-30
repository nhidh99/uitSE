package org.example.rest;

import org.example.constant.SuccessMessageConstants;
import org.example.input.QuestionInput;
import org.example.service.api.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/questions")
@PreAuthorize("isAuthenticated()")
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
}
