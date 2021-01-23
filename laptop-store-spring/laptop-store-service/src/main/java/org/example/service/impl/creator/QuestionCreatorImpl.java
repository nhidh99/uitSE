package org.example.service.impl.creator;

import org.example.dao.LaptopRepository;
import org.example.dao.QuestionReplyRepository;
import org.example.dao.UserRepository;
import org.example.dto.question.QuestionDTO;
import org.example.dto.reply.CommonReplyDTO;
import org.example.input.form.QuestionInput;
import org.example.model.Laptop;
import org.example.model.Question;
import org.example.model.QuestionReply;
import org.example.model.User;
import org.example.service.api.creator.QuestionCreator;
import org.example.util.DateUtil;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionCreatorImpl implements QuestionCreator {
    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;
    private final QuestionReplyRepository questionReplyRepository;

    @Autowired
    public QuestionCreatorImpl(UserRepository userRepository, LaptopRepository laptopRepository, QuestionReplyRepository questionReplyRepository) {
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.questionReplyRepository = questionReplyRepository;
    }

    @Override
    public Question createQuestion(QuestionInput questionInput) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String question = questionInput.getQuestion();
        Integer laptopId = questionInput.getProductId();
        User user = userRepository.findByUsername(username);
        Laptop laptop = laptopRepository.getOne(laptopId);
        return Question.builder().laptop(laptop).user(user).question(question)
                .createdAt(DateUtil.getCurrentLocalDateTime()).approveStatus(null).build();
    }

    @Override
    public QuestionDTO createQuestionDTO(Question question) {
        QuestionDTO questionDTO = ModelMapperUtil.map(question, QuestionDTO.class);
        Pair<QuestionReply, Long> answerAndReplyCount = createQuestionAnswerAndReplyCount(question);
        CommonReplyDTO answerDTO = Optional.of(answerAndReplyCount.getFirst())
                .map(answer -> ModelMapperUtil.map(answer, CommonReplyDTO.class)).orElse(null);
        long replyCount = answerAndReplyCount.getSecond();
        questionDTO.setAnswerDTO(answerDTO);
        questionDTO.setReplyCount(replyCount);
        return questionDTO;
    }

    private Pair<QuestionReply, Long> createQuestionAnswerAndReplyCount(Question question) {
        boolean isAnsweredQuestion = question.getAnswerId() != null;
        QuestionReply answer = isAnsweredQuestion ? questionReplyRepository.getOne(question.getAnswerId()) : null;
        long replyCount = questionReplyRepository.countByQuestionId(question.getId());
        return Pair.of(answer, replyCount);
    }
}
