package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.RatingReplyDAO;
import org.example.model.RatingReply;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Transactional
@NoArgsConstructor
@AllArgsConstructor
public class RatingReplyDAOImpl implements RatingReplyDAO {

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(RatingReply ratingReply) {
        em.persist(ratingReply);
    }
}
