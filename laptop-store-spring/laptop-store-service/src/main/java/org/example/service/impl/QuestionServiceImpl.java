package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.CommentRepository;
import org.example.dao.LaptopRepository;
import org.example.dao.UserRepository;
import org.example.input.QuestionInput;
import org.example.model.Question;
import org.example.model.Laptop;
import org.example.model.User;
import org.example.service.api.QuestionService;
import org.example.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;
    private final CommentRepository commentRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public QuestionServiceImpl(UserRepository userRepository,
                               LaptopRepository laptopRepository,
                               CommentRepository commentRepository,
                               PlatformTransactionManager txManager) {
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.commentRepository = commentRepository;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public void createQuestion(QuestionInput questionInput, String username) {
        if (!laptopRepository.existsByIdAndRecordStatusTrue(questionInput.getProductId())) {
            throw new IllegalArgumentException(ErrorMessageConstants.LAPTOP_NOT_FOUND);
        }

        txTemplate.executeWithoutResult((status) -> {
            User user = userRepository.findByUsername(username);
            Laptop laptop = laptopRepository.getOne(questionInput.getProductId());
            Question question = Question.builder()
                    .laptop(laptop).user(user)
                    .question(questionInput.getQuestion())
                    .commentDate(DateUtil.getCurrentLocalDate())
                    .approveStatus(false).build();
            commentRepository.save(question);
        });
    }
}