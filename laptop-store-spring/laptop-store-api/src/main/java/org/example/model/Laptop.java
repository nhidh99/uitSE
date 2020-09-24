package org.example.model;

import lombok.*;
import org.example.type.BrandType;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "laptop")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Laptop {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "brand")
    @Enumerated(EnumType.STRING)
    private BrandType brand;

    @Column(name = "unit_price")
    private Long unitPrice;

    @Column(name = "discount_price")
    private Long discountPrice;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "alt")
    private String alt;

    @Column(name = "avg_rating")
    private Float avgRating;

    @Column(name = "ports")
    private String ports;

    @Column(name = "sound_tech")
    private String soundTech;

    @Column(name = "wireless")
    private String wireless;

    @Column(name = "sd_cards")
    private String sdCards;

    @Column(name = "webcam")
    private String webcam;

    @Column(name = "specials")
    private String specials;

    @Column(name = "os")
    private String os;

    @Column(name = "design")
    private String design;

    @Column(name = "size")
    private String size;

    @Column(name = "weight")
    private Float weight;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "cpu_id")
    private CPU cpu;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "ram_id")
    private RAM ram;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "hard_drive_id")
    private HardDrive hardDrive;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "monitor_id")
    private Monitor monitor;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "battery_id")
    private Battery battery;

    @Column(name = "record_status")
    @Basic(fetch = FetchType.LAZY)
    private boolean recordStatus;

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "laptop")
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<LaptopTag> tags;

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "laptop")
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<Comment> comments;

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "laptop")
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<Rating> ratings;

    @ManyToMany(cascade = CascadeType.MERGE)
    @LazyCollection(LazyCollectionOption.TRUE)
    @JoinTable(name = "laptop_promotion",
            joinColumns = @JoinColumn(name = "laptop_id"),
            inverseJoinColumns = @JoinColumn(name = "promotion_id"))
    private List<Promotion> promotions;
}