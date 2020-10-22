package org.example.dto.laptop;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.dto.spec.*;
import org.example.type.BrandType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @JsonProperty("battery")
    private BatteryDTO batteryDTO;

    @JsonProperty("cpu")
    private CpuDTO cpuDTO;

    @JsonProperty("hard_drive")
    private HardDriveDTO hardDriveDTO;

    @JsonProperty("monitor")
    private MonitorDTO monitorDTO;

    @JsonProperty("ram")
    private RamDTO ramDTO;
}
