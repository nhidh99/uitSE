package org.example.dao;

import org.example.model.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByApproveStatusTrueAndLaptopId(Integer laptopId, Pageable pageable);

    @Query("Select count(c.id) from Comment c")
    Long countAll();
}
