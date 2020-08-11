package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.type.BrandType;

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
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Column(name = "brand")
    @JsonProperty("brand")
    @Enumerated(EnumType.STRING)
    private BrandType brand;

    @Column(name = "unit_price")
    @JsonProperty("unit_price")
    private Long unitPrice;

    @Column(name = "discount_price")
    @JsonProperty("discount_price")
    private Long discountPrice;

    @Column(name = "quantity")
    @JsonProperty("quantity")
    private Integer quantity;

    @Column(name = "alt")
    @JsonProperty("alt")
    private String alt;

    @Column(name = "avg_rating")
    @JsonProperty("avg_rating")
    private Float avgRating;

    @Column(name = "ports")
    @JsonProperty("ports")
    private String ports;

    @Column(name = "sound_tech")
    @JsonProperty("sound_tech")
    private String soundTech;

    @Column(name = "wireless")
    @JsonProperty("wireless")
    private String wireless;

    @Column(name = "sd_cards")
    @JsonProperty("sd_cards")
    private String sdCards;

    @Column(name = "webcam")
    @JsonProperty("webcam")
    private String webcam;

    @Column(name = "specials")
    private String specials;

    @Column(name = "os")
    @JsonProperty("os")
    private String os;

    @Column(name = "design")
    @JsonProperty("design")
    private String design;

    @Column(name = "size")
    @JsonProperty("size")
    private String size;

    @Column(name = "weight")
    @JsonProperty("weight")
    private Float weight;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cpu_id")
    @JsonProperty("cpu")
    private CPU cpu;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ram_id")
    @JsonProperty("ram")
    private RAM ram;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "hard_drive_id")
    @JsonProperty("hard_drive")
    private HardDrive hardDrive;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "monitor_id")
    @JsonProperty("monitor")
    private Monitor monitor;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "battery_id")
    @JsonProperty("battery")
    private Battery battery;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "large_image")
    @JsonIgnore
    private byte[] largeImage;

    @Lob
    @Column(name = "image")
    @JsonIgnore
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;

    @Lob
    @Column(name = "thumbnail")
    @JsonIgnore
    @Basic(fetch = FetchType.LAZY)
    private byte[] thumbnail;

    @Column(name = "record_status")
    @JsonIgnore
    private boolean recordStatus;

    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinTable(name = "laptop_tag",
            joinColumns = @JoinColumn(name = "laptop_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    @ToString.Exclude
    @JsonIgnore
    private List<LaptopTag> tags;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinTable(name = "laptop_promotion",
            joinColumns = @JoinColumn(name = "laptop_id"),
            inverseJoinColumns = @JoinColumn(name = "promotion_id"))
    @ToString.Exclude
    @JsonIgnore
    private List<Promotion> promotions;
}