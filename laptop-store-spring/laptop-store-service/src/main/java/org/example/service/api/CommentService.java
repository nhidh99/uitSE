package org.example.service.api;

import org.example.model.Question;

import java.util.List;

public interface CommentService {
    List<Question> findByLaptopId(Integer laptopId, int page);
}
