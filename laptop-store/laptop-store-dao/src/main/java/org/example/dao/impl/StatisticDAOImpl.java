package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.StatisticDAO;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Transactional
@NoArgsConstructor
@AllArgsConstructor
public class StatisticDAOImpl implements StatisticDAO {

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long countTotalDeliveredOrdersByUserId(Integer userId) {
        String query = "SELECT COUNT(*) FROM Order o WHERE o.status = 'DELIVERED' AND o.user.id = :userId";
        return em.createQuery(query, Long.class).setParameter("userId", userId).getSingleResult();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long countTotalAcceptedQuestionsByUserId(Integer userId) {
        String query = "SELECT COUNT(*) FROM Comment c WHERE c.approveStatus = true AND c.user.id = :userId";
        return em.createQuery(query, Long.class).setParameter("userId", userId).getSingleResult();
    }

    @Override
    public Long countTotalAcceptedRatingsByUserId(Integer userId) {
        String query = "SELECT COUNT(*) FROM Rating r WHERE r.approveStatus = true AND r.user.id = :userId";
        return em.createQuery(query, Long.class).setParameter("userId", userId).getSingleResult();
    }

    @Override
    public Long getTotalPriceOfDeliveredOrdersByUserId(Integer userId) {
        String query = "SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o " +
                "WHERE o.status = 'DELIVERED' AND o.user.id = :userId";
        return em.createQuery(query, Long.class).setParameter("userId", userId).getSingleResult();
    }

    @Override
    public Long getTotalDiscountOfDeliveredOrdersByUserId(Integer userId) {
        String query = "SELECT COALESCE(SUM(d.totalPrice), 0) FROM Order o " +
                "JOIN OrderDetail d ON d.order.id = o.id " +
                "WHERE o.user.id = :userId " +
                "AND o.status = 'DELIVERED' " +
                "AND d.productType = 'PROMOTION' ";
        return em.createQuery(query, Long.class).setParameter("userId", userId).getSingleResult();
    }
}
