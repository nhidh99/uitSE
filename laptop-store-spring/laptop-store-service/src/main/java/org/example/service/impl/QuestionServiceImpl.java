package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.constant.PaginateConstants;
import org.example.dao.LaptopRepository;
import org.example.dao.QuestionRepository;
import org.example.dao.UserRepository;
import org.example.dto.comment.QuestionDTO;
import org.example.input.QuestionInput;
import org.example.model.Laptop;
import org.example.model.Question;
import org.example.model.User;
import org.example.service.api.QuestionService;
import org.example.util.DateUtil;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;
    private final QuestionRepository questionRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public QuestionServiceImpl(UserRepository userRepository,
                               LaptopRepository laptopRepository,
                               QuestionRepository questionRepository,
                               PlatformTransactionManager txManager) {
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.questionRepository = questionRepository;
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
                    .commentDate(DateUtil.getCurrentLocalDateTime())
                    .approveStatus(false).build();
            questionRepository.save(question);
        });
    }

    @Override
    public Pair<List<QuestionDTO>, Long> findByProductId(Integer productId, Integer page) {
        Pageable pageable = PageRequest.of(page - 1,
                PaginateConstants.QUESTION_PER_USER_PAGE,
                Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            List<Question> questions = questionRepository.findByApproveStatusTrueAndLaptopId(productId, pageable);
            long questionCount = questionRepository.countByApproveStatusTrueAndLaptopId(productId);
            return Pair.of(ModelMapperUtil.mapList(questions, QuestionDTO.class), questionCount);
        });
    }
}