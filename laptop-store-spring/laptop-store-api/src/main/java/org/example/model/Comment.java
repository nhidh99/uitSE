package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comment")
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    @ToString.Exclude
    private User user;

    @Formula("(SELECT u.name FROM user u WHERE u.id = user_id)")
    @JsonProperty("user")
    private String userFullName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laptop_id")
    @JsonIgnore
    private Laptop laptop;

    @Column(name = "question")
    @JsonProperty("question")
    private String question;

    @Column(name = "comment_date")
    @JsonProperty("comment_date")
    private LocalDate commentDate;

    @Column(name = "approve_status")
    @JsonProperty("approve_status")
    private boolean approveStatus;

    @OneToMany(mappedBy = "comment", orphanRemoval = true)
    @JsonProperty("replies")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<CommentReply> replies;
}
