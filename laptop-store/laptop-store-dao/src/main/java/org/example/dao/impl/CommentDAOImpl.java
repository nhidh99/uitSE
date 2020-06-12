package org.example.dao.impl;

import org.example.dao.api.CommentDAO;
import org.example.model.Comment;
import org.example.model.Laptop;
import org.example.model.Rating;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public class CommentDAOImpl implements CommentDAO {
    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Comment comment) {
        em.persist(comment);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Comment> findByProductId(Integer productId) {
        String query = "SELECT c FROM Comment c WHERE c.laptop.id = :id";
        return em.createQuery(query, Comment.class)
                    .setParameter("id", productId)
                    .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Comment> findById(Integer commentId) {
        Comment comment = em.find(Comment.class, commentId);
        return Optional.of(comment);
    }
}
