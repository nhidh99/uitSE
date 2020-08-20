package org.example.rest;

import org.example.model.Rating;
import org.example.service.api.RatingService;
import org.example.service.impl.RatingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@PreAuthorize("isAuthenticated()")
public class RatingRestService {
    @Autowired
    private RatingService ratingService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> findAll(@RequestParam(defaultValue = "1") int page) {
        List<Rating> ratings = ratingService.findAll(page);
        return ResponseEntity.ok(ratings);
    }
}
