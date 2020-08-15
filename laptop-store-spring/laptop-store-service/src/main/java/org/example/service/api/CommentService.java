package org.example.service.api;

import org.example.model.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> findByLaptopId(Integer laptopId, int page);
}
