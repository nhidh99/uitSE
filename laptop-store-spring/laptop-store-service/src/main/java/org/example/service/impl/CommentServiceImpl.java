package org.example.service.impl;

import org.example.dao.CommentRepository;
import org.example.model.Question;
import org.example.service.api.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private static final int SIZE_PER_PAGE = 5;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<Question> findByLaptopId(Integer laptopId, int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return commentRepository.findByApproveStatusTrueAndLaptopId(laptopId, pageable);
    }
}
