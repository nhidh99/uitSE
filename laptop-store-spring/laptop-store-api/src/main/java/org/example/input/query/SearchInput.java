package org.example.input.query;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.example.type.SearchOrderType;
import org.example.type.SearchTargetType;

@Getter
@Setter
@SuperBuilder
public abstract class SearchInput {
    protected String query;
    protected SearchOrderType order;
    protected SearchTargetType target;
    protected Integer page;
}
