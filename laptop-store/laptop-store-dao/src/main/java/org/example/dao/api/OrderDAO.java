package org.example.dao.api;

import org.example.model.Order;
import org.example.model.OrderOverview;
import org.example.type.OrderStatus;


import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface OrderDAO {
    void save(Order order);

    Optional<Order> findById(Integer id);

    Long findTotalOrder(String filter, String status);

    List<OrderOverview> findByFilter(String id, String status, Integer page);

    List<OrderOverview> findByUserId(Integer page, Integer userId);

    List<OrderOverview> findByPages(Integer page);

    Long findTotalOrdersByUserId(Integer userId);

    void updateStatus(Integer orderId, OrderStatus orderStatus) throws SQLException;
}
