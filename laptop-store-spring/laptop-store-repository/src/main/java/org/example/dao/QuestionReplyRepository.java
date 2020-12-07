package org.example.dao;

import org.example.model.QuestionReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionReplyRepository extends JpaRepository<QuestionReply, Integer> {
    long countByQuestionId(Integer id);

    List<QuestionReply> findByQuestionIdAndIdNot(Integer questionId, Integer id);
}
