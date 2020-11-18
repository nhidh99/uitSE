package org.example.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ram_id")
    private RAM ram;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hard_drive_id")
    private HardDrive hardDrive;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "monitor_id")
    private Monitor monitor;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "battery_id")
    private Battery battery;

    @Column(name = "sold_quantity")
    @Basic(fetch = FetchType.LAZY)
    private Integer soldQuantity;

    @Column(name = "record_status")
    @Basic(fetch = FetchType.LAZY)
    private boolean recordStatus;

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "laptop")
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<LaptopTag> tags;

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "laptop")
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<Question> questions;

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "laptop")
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<Rating> ratings;

    @ManyToMany(cascade = CascadeType.MERGE)
    @LazyCollection(LazyCollectionOption.TRUE)
    @JoinTable(name = "laptop_promotion",
            joinColumns = @JoinColumn(name = "laptop_id"),
            inverseJoinColumns = @JoinColumn(name = "promotion_id"))
    private List<Promotion> promotions;

    public String getRamInfo() {
        return new StringBuilder(ram.getSize()).append("GB").toString();
    }

    public String getHardDriveInfo() {
        Integer size = hardDrive.getSize();
        StringBuilder sb = new StringBuilder(hardDrive.getType().name());
        if (size >= 1024) {
            return sb.append(" ").append(size / 1024).append("TB").toString();
        }
        return sb.append(" ").append(size).append("GB").toString();
    }
}