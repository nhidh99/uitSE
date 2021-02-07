package org.example.service.impl.creator;

import org.example.dao.LaptopRepository;
import org.example.dao.ReplyRepository;
import org.example.dao.UserRepository;
import org.example.dto.question.QuestionDTO;
import org.example.dto.reply.ReplyDTO;
import org.example.input.form.QuestionInput;
import org.example.model.Laptop;
import org.example.model.Question;
import org.example.model.Reply;
import org.example.model.User;
import org.example.service.api.creator.QuestionCreator;
import org.example.util.DateUtil;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionCreatorImpl implements QuestionCreator {
    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;
    private final ReplyRepository replyRepository;

    @Autowired
    public QuestionCreatorImpl(UserRepository userRepository, LaptopRepository laptopRepository, ReplyRepository replyRepository) {
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
        this.replyRepository = replyRepository;
    }

    @Override
    public Question createQuestion(QuestionInput questionInput) {
        String username = questionInput.getUsername();
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
        Pair<Reply, Long> answerAndReplyCount = createQuestionAnswerAndReplyCount(question);
        ReplyDTO answerDTO = Optional.of(answerAndReplyCount.getFirst())
                .map(answer -> ModelMapperUtil.map(answer, ReplyDTO.class)).orElse(null);
        long replyCount = answerAndReplyCount.getSecond();
        questionDTO.setAnswerDTO(answerDTO);
        questionDTO.setReplyCount(replyCount);
        return questionDTO;
    }

    private Pair<Reply, Long> createQuestionAnswerAndReplyCount(Question question) {
        boolean isAnsweredQuestion = question.getAnswerId() != null;
        Reply answer = isAnsweredQuestion ? replyRepository.getOne(question.getAnswerId()) : null;
        long replyCount = replyRepository.countApprovedQuestionReplies(question.getId());
        return Pair.of(answer, replyCount);
    }
}
