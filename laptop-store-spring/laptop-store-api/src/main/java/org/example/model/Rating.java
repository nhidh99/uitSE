package org.example.model;

import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "laptop_id")
    @ToString.Exclude
    private Laptop laptop;

    @Column(name = "point")
    private Integer point;

    @Column(name = "detail")
    private String detail;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "approve_status")
    private Boolean approveStatus;

    @OneToMany(mappedBy = "rating", orphanRemoval = true)
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<RatingReply> replies;

    public String getAuthorName() {
        return user.getName();
    }

    public String getProductName() {
        return laptop.getName();
    }
}
