package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor()
@Builder
@Table(name = "promotion")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @NonNull
    private Integer id;

    @Column(name = "name")
    @JsonProperty("name")
    @NonNull
    private String name;

    @Column(name = "price")
    @JsonProperty("price")
    @NonNull
    private Long price;

    @Column(name = "quantity")
    @JsonProperty("quantity")
    @NonNull
    private Integer quantity;

    @Column(name = "alt")
    @JsonProperty("alt")
    @NonNull
    private String alt;

    @Lob
    @Column(name = "image")
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;

    @Basic(fetch = FetchType.LAZY)
    @Column(name = "record_status")
    @JsonIgnore
    private boolean recordStatus;

    @ManyToMany(cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.TRUE)
    @JoinTable(name = "laptop_promotion",
            joinColumns = @JoinColumn(name = "promotion_id"),
            inverseJoinColumns = @JoinColumn(name = "laptop_id"))
    @ToString.Exclude
    @JsonIgnore
    private List<Laptop> laptops;
}