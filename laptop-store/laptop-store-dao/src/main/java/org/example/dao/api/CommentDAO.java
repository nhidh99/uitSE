package org.example.dao.api;

import org.example.model.Comment;
import org.example.model.CommentReply;

import java.util.List;
import java.util.Optional;

public interface CommentDAO {
    void save(Comment comment);

    List<Comment> findByProductId(Integer laptopId);

    Optional<Comment> findById(Integer commentId);

    List<Comment> findByFilter(String id, String status, Integer page);

    Long findTotalCommentByFilter(String id, String status);

    Long findTotalCommentByProductId(Integer laptopId);

    List<Comment> findByPage(Integer page);

    void approve(Integer id, CommentReply commentReply);

    void deny(Integer id);

    void delete(Integer id);
}
