package org.example.input;

import lombok.Builder;
import lombok.Data;
import org.example.type.BrandType;
import org.example.type.CPUType;
import org.example.type.LaptopTagType;
import org.example.type.FilterTargetType;

import java.util.List;

@Data
@Builder
public class LaptopFilterInput {
    private String name;
    private Integer price;
    private List<BrandType> brands;
    private List<LaptopTagType> tags;
    private List<CPUType> cpus;
    private List<Integer> rams;
    private Integer page;
    private FilterTargetType target;
}