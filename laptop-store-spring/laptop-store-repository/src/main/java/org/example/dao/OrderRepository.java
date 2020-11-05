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

    long countByUserUsername(String username);

    boolean existsByIdAndUserUsername(Integer id, String username);

    long countByStatusAndUserUsername(OrderStatus orderStatus, String username);

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

    List<Order> findByStatus(OrderStatus status, Pageable pageable);

    long countByStatus(OrderStatus status);

    @Query("SELECT o FROM Order o " +
            "WHERE o.status = :status " +
            "AND (TRIM(o.id) LIKE %:query% " +
            "OR o.receiverName LIKE %:query% " +
            "OR o.receiverPhone LIKE %:query%)")
    List<Order> findByQueryAndStatus(@Param("query") String query,
                                     @Param("status") OrderStatus status,
                                     Pageable pageable);

    @Query("SELECT COUNT(o) FROM Order o " +
            "WHERE o.status = :status " +
            "AND (TRIM(o.id) = :query " +
            "OR o.receiverName LIKE %:query% " +
            "OR o.receiverPhone LIKE %:query%)")
    long countByQueryAndStatus(@Param("query") String query, @Param("status") OrderStatus status);
}