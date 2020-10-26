package org.example.input;

import lombok.Builder;
import lombok.Data;
import org.example.type.SearchTagetType;
import org.example.type.SearchOrderType;

@Data
@Builder
public class SearchInput {
    private String query;
    private SearchOrderType order;
    private SearchTagetType target;
    private Integer page;
}
