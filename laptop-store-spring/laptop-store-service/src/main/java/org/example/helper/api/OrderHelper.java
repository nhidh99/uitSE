package org.example.helper.api;

import org.example.model.Order;

public interface OrderHelper {
    Order createUserOrderWithoutAddress(String username);
    Order createUserOrderWithAddress(String username, Integer addressId);
}
