package org.example.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "question_reply")
public class QuestionReply {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    @ToString.Exclude
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;

    @Formula("(SELECT u.name FROM user u WHERE u.id = user_id)")
    @JsonProperty("user")
    private String userFullName;

    @Column(name = "reply")
    private String reply;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}