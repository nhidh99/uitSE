package org.example.service.api.creator;

import org.example.model.Order;

public interface OrderCreator {
    Order createUserOrderWithoutAddress(String username);

    Order createUserOrderWithAddress(String username, Integer addressId);
}
