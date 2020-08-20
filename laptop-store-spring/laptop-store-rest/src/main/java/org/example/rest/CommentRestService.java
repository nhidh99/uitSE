package org.example.rest;

import org.example.model.Comment;
import org.example.service.api.CommentService;
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
@RequestMapping("/api/comments")
@PreAuthorize("isAuthenticated()")
public class CommentRestService {
    @Autowired
    private CommentService commentService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> findAll(@RequestParam(defaultValue = "1") int page) {
        List<Comment> comments = commentService.findAll(page);
        Long ratingCount = commentService.countAll();
        return ResponseEntity.ok().header("X-Total-Count", ratingCount.toString()).body(comments);
    }
}
