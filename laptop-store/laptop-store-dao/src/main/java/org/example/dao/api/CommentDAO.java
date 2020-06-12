package org.example.dao.api;

import org.example.model.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentDAO {
    void save(Comment comment);

    List<Comment> findByProductId(Integer productId);

    Optional<Comment> findById(Integer commentId);
}
