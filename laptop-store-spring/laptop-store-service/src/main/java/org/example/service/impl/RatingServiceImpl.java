package org.example.service.impl;

import org.example.dao.model.RatingRepository;
import org.example.model.Rating;
import org.example.service.api.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {
    private static final int SIZE_PER_PAGE = 5;

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public List<Rating> findByLaptopId(Integer laptopId, int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return ratingRepository.findByApproveStatusTrueAndLaptopId(laptopId, pageable);
    }
}
