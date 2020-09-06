package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "rating")
@Builder
public class Rating {
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
    @ToString.Exclude
    private Laptop laptop;

    @Column(name = "rating")
    @JsonProperty("rating")
    private Integer rating;

    @Column(name = "comment_title")
    @JsonProperty("comment_title")
    private String commentTitle;

    @Column(name = "comment_detail")
    @JsonProperty("comment_detail")
    private String commentDetail;

    @Column(name = "rating_date")
    @JsonProperty("rating_date")
    private LocalDate ratingDate;

    @Column(name = "approve_status")
    @JsonProperty("approve_status")
    private boolean approveStatus;

    @OneToMany(mappedBy = "rating", orphanRemoval = true)
    @JsonProperty("replies")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<RatingReply> replies;
}
