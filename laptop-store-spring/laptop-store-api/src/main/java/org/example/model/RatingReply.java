package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "rating_reply")
public class RatingReply {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rating_id")
    @JsonIgnore
    @ToString.Exclude
    private Rating rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    @ToString.Exclude
    private User user;

    @Formula("(SELECT u.name FROM user u WHERE u.id = user_id)")
    @JsonProperty("user")
    private String userFullName;

    @Column(name = "reply")
    @JsonProperty("reply")
    private String reply;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}