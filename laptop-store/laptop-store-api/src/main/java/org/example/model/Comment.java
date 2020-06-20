package org.example.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty("user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "laptop_id")
    @JsonProperty("laptop")
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

    @OneToMany(mappedBy = "comment", fetch = FetchType.EAGER)
    @JsonProperty("replies")
    private List<CommentReply> replies;
}
