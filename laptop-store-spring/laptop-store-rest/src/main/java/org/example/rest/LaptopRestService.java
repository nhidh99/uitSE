package org.example.rest;

import org.example.model.*;
import org.example.projection.LaptopSummary;
import org.example.service.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/laptops")
@PreAuthorize("permitAll()")
public class LaptopRestService {
    @Autowired
    private LaptopService laptopService;

    @Autowired
    private LaptopImageService laptopImageService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private PromotionService promotionService;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getById(@PathVariable("id") int id,
                                     @RequestParam(value = "include", required = false) List<String> includeList) {
        Optional<Laptop> optLaptop = laptopService.findById(id);
        if (!optLaptop.isPresent()) {
            return ResponseEntity.notFound().build();
        } else if (includeList == null || includeList.isEmpty()) {
            return ResponseEntity.ok(optLaptop.get());
        }

        Map<String, Object> laptopDetailMap = new HashMap<>();
        Laptop laptop = optLaptop.get();
        laptopDetailMap.put("details", laptop);

        if (includeList.contains("images")) {
            List<Integer> imageIds = laptopImageService.findIdsByLaptopId(id);
            laptopDetailMap.put("image_ids", imageIds);
        }
        if (includeList.contains("comments")) {
            List<Comment> comments = commentService.findByLaptopId(id, 1);
            laptopDetailMap.put("comments", comments);
        }
        if (includeList.contains("ratings")) {
            List<Rating> ratings = ratingService.findByLaptopId(id, 1);
            laptopDetailMap.put("ratings", ratings);
        }
        if (includeList.contains("promotions")) {
            List<Promotion> promotions = laptop.getPromotions();
            laptopDetailMap.put("promotions", promotions);
        }
        if (includeList.contains("suggestions")) {
            List<LaptopSummary> suggestions = laptopService.findSuggestionsById(id);
            laptopDetailMap.put("suggestions", suggestions);
        }
        return ResponseEntity.ok(laptopDetailMap);
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getByPage(@RequestParam(defaultValue = "1") int page) {
        List<LaptopSummary> laptops = laptopService.findByPage(page);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/discount", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getMostDiscountByPage(@RequestParam(defaultValue = "1") int page) {
        List<LaptopSummary> laptops = laptopService.findMostDiscountByPage(page);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/cheap", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getCheapestByPage(@RequestParam(defaultValue = "1") int page) {
        List<LaptopSummary> laptops = laptopService.findCheapestByPage(page);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/best-selling", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getBestSellingByPage(@RequestParam(defaultValue = "1") int page) {
        List<LaptopSummary> laptops = laptopService.findBestSellingByPage(page);
        return ResponseEntity.ok(laptops);
    }
}