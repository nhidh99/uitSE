package org.example.input;

import lombok.Builder;
import lombok.Data;
import org.example.type.SearchTargetType;
import org.example.type.SearchOrderType;

@Data
@Builder
public class SearchInput {
    private String query;
    private SearchOrderType order;
    private SearchTargetType target;
    private Integer page;
}
