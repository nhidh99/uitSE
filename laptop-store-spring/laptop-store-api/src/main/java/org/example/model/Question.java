package org.example.model;

import lombok.*;
import org.example.util.Pair;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "question")
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laptop_id")
    private Laptop laptop;

    @Column(name = "question")
    private String question;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "approve_status")
    private Boolean approveStatus;

    @Column(name = "answer_id")
    private Integer answerId;

    @OneToMany(mappedBy = "question", orphanRemoval = true)
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<QuestionReply> replies;

    public String getAuthorName() {
        return user.getName();
    }

    public String getProductName() { return laptop.getName(); }
}