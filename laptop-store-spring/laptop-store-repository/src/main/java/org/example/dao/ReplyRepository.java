package org.example.dao;

import org.example.model.Order;
import org.example.model.Reply;
import org.example.type.FeedbackStatus;
import org.example.type.ReplyType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Integer> {
    @Query("SELECT r FROM Reply r " +
            "WHERE r.parentId = :questionId " +
            "AND r.approveStatus = true " +
            "AND r.replyType = 'QUESTION'")
    long countApprovedQuestionReplies(@Param("questionId") Integer questionId);

    @Query("SELECT r FROM Reply r " +
            "WHERE r.parentId = :ratingId " +
            "AND r.approveStatus = true " +
            "AND r.replyType = 'RATING'")
    long countApprovedRatingReplies(@Param("ratingId") Integer ratingId);

    @Query("SELECT r FROM Reply r " +
            "WHERE r.parentId = :questionId " +
            "AND r.approveStatus = true " +
            "AND r.replyType = 'QUESTION' " +
            "AND r.id <> :answerId")
    List<Reply> findApprovedQuestionRepliesExceptAnswer(
            @Param("questionId") Integer questionId,
            @Param("answerId") Integer answerId);

//    List<Order> findByQueryAndStatus(String query, FeedbackStatus status, Pageable pageable);
//
//    long countByQueryAndStatus(String query, FeedbackStatus status);
//
//    List<Order> findByStatus(FeedbackStatus status, Pageable pageable);
//
//    long countByStatus(FeedbackStatus status);
}
