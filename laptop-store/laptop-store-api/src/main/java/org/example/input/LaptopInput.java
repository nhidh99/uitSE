package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;
import org.example.model.CPU;
import org.example.model.HardDrive;
import org.example.model.Monitor;
import org.example.model.RAM;
import org.example.type.*;

import java.util.List;

@Data
public class LaptopInput {
    @JsonProperty("name")
    private String name;

    @JsonProperty("brand")
    private BrandType brand;

    @JsonProperty("cpu-type")
    private CPUType cpuType;

    @JsonProperty("cpu-detail")
    private String cpuDetail;

    @JsonProperty("graphics-card")
    private String graphicsCard;

    @JsonProperty("ports")
    private String ports;

    @JsonProperty("os")
    private String os;

    @JsonProperty("design")
    private String design;

    @JsonProperty("unit-price")
    private Long unitPrice;

    @JsonProperty("discount-price")
    private Long discountPrice;

    @JsonProperty("quantity")
    private Integer quatity;

    @JsonProperty("ram-type")
    private RAMType ramType;

    @JsonProperty("ram-size")
    private Integer ramSize;

    @JsonProperty("ram-bus")
    private Integer ramBus;

    @JsonProperty("ram-extra-slot")
    private Integer ramExtraSlot;

    @JsonProperty("hd-type")
    private HardDriveType hardDriveType;

    @JsonProperty("hd-detail")
    private String hardDriveDetail;

    @JsonProperty("hd-size")
    private Integer hardDriveSize;

    @JsonProperty("resolution-type")
    private ResolutionType resolutionType;

    @JsonProperty("resolution-width")
    private Integer resolutionWidth;

    @JsonProperty("resolution-height")
    private Integer resolutionHeight;

    @JsonProperty("cpu-speed")
    private Float cpuSpeed;

    @JsonProperty("cpu-max-speed")
    private Float cpuMaxSpeed;

    @JsonProperty("monitor-size")
    private Float monitorSize;

    @JsonProperty("thickness")
    private Float thickness;

    @JsonProperty("weight")
    private Float weight;

    @JsonProperty("cpu-id")
    private Integer cpuId;

    @JsonProperty("ram-id")
    private Integer ramId;

    @JsonProperty("monitor-id")
    private Integer monitorId;

    @JsonProperty("hd-id")
    private Integer hardDriveId;

    @JsonProperty("promotions")
    private List<Integer> promotionIds;

    @JsonProperty("tags")
    private List<Integer> tagIds;

    public RAM extractRAM() {
        return RAM.builder().id(ramId).size(ramSize).type(ramType).bus(ramBus).extraSlot(ramExtraSlot).build();
    }

    public CPU extractCPU() {
        return CPU.builder().id(cpuId).type(cpuType).detail(cpuDetail).speed(cpuSpeed).maxSpeed(cpuMaxSpeed).build();
    }

    public HardDrive extractHardDrive() {
        return HardDrive.builder().id(hardDriveId).type(hardDriveType).size(hardDriveSize).detail(hardDriveDetail).build();
    }

    public Monitor extractMonitor() {
        return Monitor.builder().id(monitorId).size(monitorSize)
                .resolutionType(resolutionType).resolutionWidth(resolutionWidth)
                .resolutionHeight(resolutionHeight).build();
    }
}