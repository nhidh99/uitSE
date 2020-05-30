package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.RatingReplyDAO;
import org.example.model.RatingReply;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

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

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<RatingReply> findByRatingIds(List<Integer> ratingIds) {
//        List<Integer> ids = new ArrayList<Integer>();
//        for (String s : ratingIds) ids.add(Integer.valueOf(s));

        String query = "SELECT r FROM RatingReply r WHERE r.rating.id IN :ratingIds";
        return em.createQuery(query, RatingReply.class).setParameter("ratingIds", ratingIds).getResultList();
    }
}
