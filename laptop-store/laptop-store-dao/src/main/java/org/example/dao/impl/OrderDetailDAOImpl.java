package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.OrderDetailDAO;
import org.example.model.OrderDetail;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDAOImpl implements OrderDetailDAO {

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<OrderDetail> findByOrderId(Integer orderId) {
        String query = "SELECT d FROM OrderDetail d WHERE d.order.id = :orderId";
        return em.createQuery(query, OrderDetail.class)
                .setParameter("orderId", orderId)
                .getResultList();
    }
}
