package org.example.service.impl.service;

import org.example.constant.CacheConstants;
import org.example.constant.PaginateConstants;
import org.example.dao.LaptopRepository;
import org.example.dao.QuestionReplyRepository;
import org.example.dao.QuestionRepository;
import org.example.dao.UserRepository;
import org.example.dto.question.QuestionDTO;
import org.example.dto.question.QuestionSummaryDTO;
import org.example.dto.reply.CommonReplyDTO;
import org.example.service.api.checker.LaptopChecker;
import org.example.input.form.QuestionInput;
import org.example.model.Laptop;
import org.example.model.Question;
import org.example.model.QuestionReply;
import org.example.model.User;
import org.example.service.api.creator.QuestionCreator;
import org.example.service.api.service.QuestionService;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    private final QuestionReplyRepository questionReplyRepository;
    private final QuestionCreator questionCreator;
    private final LaptopChecker laptopChecker;
    private final TransactionTemplate txTemplate;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository, QuestionReplyRepository questionReplyRepository,
                               QuestionCreator questionCreator, LaptopChecker laptopChecker,
                               PlatformTransactionManager txManager) {
        this.questionRepository = questionRepository;
        this.questionReplyRepository = questionReplyRepository;
        this.questionCreator = questionCreator;
        this.laptopChecker = laptopChecker;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public void insertQuestion(QuestionInput questionInput) {
        Integer laptopId = questionInput.getProductId();
        txTemplate.executeWithoutResult((status) -> {
            laptopChecker.checkExistedLaptop(laptopId);
            Question question = questionCreator.createQuestion(questionInput);
            questionRepository.save(question);
        });
    }

    @Override
    @Cacheable(value = CacheConstants.QUESTIONS, key = "'laptop-id:' + #productId + ':page:' + #page")
    public Pair<List<QuestionDTO>, Long> findAndCountQuestionsByProductId(Integer productId, Integer page) {
        Pageable pageable = PageRequest.of(page - 1, PaginateConstants.QUESTION_PER_USER_PAGE, Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            List<Question> questions = questionRepository.findByApproveStatusTrueAndLaptopId(productId, pageable);
            long count = questionRepository.countByApproveStatusTrueAndLaptopId(productId);
            List<QuestionDTO> questionDTOs = questions.stream()
                    .map(questionCreator::createQuestionDTO)
                    .collect(Collectors.toList());
            return Pair.of(questionDTOs, count);
        });
    }

    @Override
    public Pair<List<QuestionSummaryDTO>, Long> findQuestionsByStatus(FeedbackStatus status, int page) {
        Pageable pageable = PageRequest.of(page - 1, PaginateConstants.SIZE_PER_ADMIN_PAGE, Sort.by("id").descending());
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