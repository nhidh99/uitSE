package org.example.service.impl.creator;

import org.example.dao.LaptopRepository;
import org.example.dao.UserRepository;
import org.example.input.form.RatingInput;
import org.example.model.Laptop;
import org.example.model.Rating;
import org.example.model.User;
import org.example.service.api.creator.RatingCreator;
import org.example.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class RatingCreatorImpl implements RatingCreator {
    private final UserRepository userRepository;
    private final LaptopRepository laptopRepository;

    @Autowired
    public RatingCreatorImpl(UserRepository userRepository, LaptopRepository laptopRepository) {
        this.userRepository = userRepository;
        this.laptopRepository = laptopRepository;
    }

    @Override
    public Rating createRating(RatingInput ratingInput) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Integer laptopId = ratingInput.getProductId();
        Integer point = ratingInput.getPoint();
        String detail = ratingInput.getDetail();
        User user = userRepository.findByUsername(username);
        Laptop laptop = laptopRepository.getOne(laptopId);
        return Rating.builder().user(user).laptop(laptop).point(point).detail(detail)
                .createdAt(DateUtil.getCurrentLocalDateTime()).build();
    }
}
