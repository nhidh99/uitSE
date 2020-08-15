package org.example.service.impl;

import org.example.dao.CommentRepository;
import org.example.model.Comment;
import org.example.service.api.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CommentServiceImpl implements CommentService {
    private static final int SIZE_PER_PAGE = 5;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<Comment> findByLaptopId(Integer laptopId, int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return commentRepository.findByApproveStatusTrueAndLaptopId(laptopId, pageable);
    }
}