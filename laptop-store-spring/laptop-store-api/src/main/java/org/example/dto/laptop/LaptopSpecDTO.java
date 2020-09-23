package org.example.dto.laptop;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.model.*;
import org.example.type.BrandType;

@Data
@NoArgsConstructor
public class LaptopSpecDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("brand")
    private BrandType brand;

    @JsonProperty("unit_price")
    private Long unitPrice;

    @JsonProperty("discount_price")
    private Long discountPrice;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonProperty("alt")
    private String alt;

    @JsonProperty("avg_rating")
    private Float avgRating;

    @JsonProperty("ports")
    private String ports;

    @JsonProperty("sound_tech")
    private String soundTech;

    @JsonProperty("wireless")
    private String wireless;

    @JsonProperty("sd_cards")
    private String sdCards;

    @JsonProperty("webcam")
    private String webcam;

    @JsonProperty("specials")
    private String specials;

    @JsonProperty("os")
    private String os;

    @JsonProperty("design")
    private String design;

    @JsonProperty("size")
    private String size;

    @JsonProperty("weight")
    private Float weight;

    @JsonProperty("cpu")
    private CPU cpu;

    @JsonProperty("ram")
    private RAM ram;

    @JsonProperty("hard_drive")
    private HardDrive hardDrive;

    @JsonProperty("monitor")
    private Monitor monitor;

    @JsonProperty("battery")
    private Battery battery;
}
