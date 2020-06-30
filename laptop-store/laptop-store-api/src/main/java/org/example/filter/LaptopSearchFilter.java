package org.example.filter;

import lombok.Data;
import org.example.type.BrandType;
import org.example.type.CPUType;

import javax.ws.rs.QueryParam;
import java.util.List;

@Data
public class LaptopSearchFilter {
    @QueryParam("name")
    private String name;

    @QueryParam("price")
    private Integer price;

    @QueryParam("brands")
    private List<BrandType> brands;

    @QueryParam("tags")
    private List<Integer> tags;

    @QueryParam("cpus")
    private List<CPUType> cpus;

    @QueryParam("rams")
    private List<Integer> rams;
}
