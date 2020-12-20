package org.example.input.query;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.example.type.OrderStatus;

@Getter
@Setter
@SuperBuilder
public class OrderSearchInput extends SearchInput {
    private OrderStatus status;
}
