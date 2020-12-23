package org.example.service.impl;

import org.example.constant.CacheConstants;
import org.example.constant.ErrorMessageConstants;
import org.example.constant.PaginateConstants;
import org.example.dao.LaptopRepository;
import org.example.dao.QuestionReplyRepository;
import org.example.dao.QuestionRepository;
import org.example.dao.UserRepository;
import org.example.dto.question.QuestionDTO;
import org.example.dto.question.QuestionSummaryDTO;
import org.example.dto.reply.CommonReplyDTO;
import org.example.input.form.QuestionInput;
import org.example.model.Laptop;
import org.example.model.Question;
import org.example.model.QuestionReply;
import org.example.model.User;
import org.example.service.api.QuestionService;
import org.example.type.FeedbackStatus;
import org.example.util.DateUtil;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;
    private final QuestionRepository questionRepository;
    private final QuestionReplyRepository questionReplyRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public QuestionServiceImpl(UserRepository userRepository, LaptopRepository laptopRepository,
                               QuestionRepository questionRepository, QuestionReplyRepository questionReplyRepository,
                               PlatformTransactionManager txManager) {
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.questionRepository = questionRepository;
        this.questionReplyRepository = questionReplyRepository;
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
                    .createdAt(DateUtil.getCurrentLocalDateTime())
                    .approveStatus(null).build();
            questionRepository.save(question);
        });
    }

    @Override
    @Cacheable(value = CacheConstants.QUESTIONS, key = "'laptop-id:' + #productId + ':page:' + #page")
    public Pair<List<QuestionDTO>, Long> findByProductId(Integer productId, Integer page) {
        Pageable pageable = PageRequest.of(page - 1,
                PaginateConstants.QUESTION_PER_USER_PAGE,
                Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            List<Question> questions = questionRepository.findByApproveStatusTrueAndLaptopId(productId, pageable);
            long questionCount = questionRepository.countByApproveStatusTrueAndLaptopId(productId);
            List<QuestionDTO> questionDTOs = questions.stream().map((question) -> {
                QuestionDTO questionDTO = ModelMapperUtil.map(question, QuestionDTO.class);
                long replyCount = questionReplyRepository.countByQuestionId(question.getId());
                questionDTO.setReplyCount(replyCount);

                if (question.getAnswerId() != null) {
                    QuestionReply answer = questionReplyRepository.getOne(question.getAnswerId());
                    questionDTO.setAnswerDTO(ModelMapperUtil.map(answer, CommonReplyDTO.class));
                }
                return questionDTO;
            }).collect(Collectors.toList());
            return Pair.of(questionDTOs, questionCount);
        });
    }

    @Override
    public Pair<List<QuestionSummaryDTO>, Long> findByStatus(FeedbackStatus status, int page) {
        Pageable pageable = PageRequest.of(page - 1,
                PaginateConstants.SIZE_PER_ADMIN_PAGE,
                Sort.by("id").descending());
        return txTemplate.execute((txStatus) -> {
            Boolean approveStatus = status.getApproveStatus();
            List<Question> questions = questionRepository.findByApproveStatusIs(approveStatus, pageable);
            long questionCount = questionRepository.countByApproveStatusIs(approveStatus);
            return Pair.of(ModelMapperUtil.mapList(questions, QuestionSummaryDTO.class), questionCount);
        });
    }

    @Override
    public List<CommonReplyDTO> findMoreRepliesById(Integer questionId) {
        return txTemplate.execute((status) -> {
            Question question = questionRepository.findById(questionId).orElseThrow(IllegalArgumentException::new);
            List<QuestionReply> moreReplies = questionReplyRepository.findByQuestionIdAndIdNot(questionId, question.getAnswerId());
            return ModelMapperUtil.mapList(moreReplies, CommonReplyDTO.class);
        });
    }
}