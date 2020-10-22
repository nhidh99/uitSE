package org.example.dao;

import org.example.model.Order;
import org.example.type.OrderStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserUsername(String username, Pageable pageable);

    Long countByUserUsername(String username);

    boolean existsByIdAndUserUsername(Integer id, String username);

    Long countByStatusAndUserUsername(OrderStatus orderStatus, String username);

    @Query("SELECT SUM(o.totalPrice) FROM Order o " +
            "WHERE o.status = 'DELIVERED' " +
            "AND o.user.username = :username")
    Long getTotalPriceOfDeliveredOrdersByUsername(@Param("username") String username);

    @Query("SELECT SUM(i.totalPrice) FROM Order o " +
            "JOIN o.items AS i " +
            "WHERE i.productType = 'PROMOTION' " +
            "AND o.status = 'DELIVERED' " +
            "AND o.user.username = :username")
    Long getTotalDiscountOfDeliveredOrdersByUsername(@Param("username") String username);
}