package org.example.input;

import lombok.Builder;
import lombok.Data;
import org.example.type.SortFilterType;

@Data
@Builder
public class LaptopSearchInput {
    private String name;
    private Integer page;
    private SortFilterType sort;
}
