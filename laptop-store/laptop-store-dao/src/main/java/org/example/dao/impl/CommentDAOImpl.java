package org.example.dao.impl;

import org.example.dao.api.CommentDAO;
import org.example.model.Comment;
import org.example.model.CommentReply;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.List;
import java.util.Optional;

public class CommentDAOImpl implements CommentDAO {

    private static final Integer ELEMENT_PER_ADMIN_BLOCK = 5;

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
        String query = "SELECT c FROM Comment c WHERE c.laptop.id = :id AND c.approveStatus = true";
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

    @Override
    public List<Comment> findByFilter(String id, String status, Integer page) {
        String query = "SELECT c FROM Comment c " +
                "WHERE (c.id is NULL OR cast(c.id as string) = '' OR cast(c.id as string) LIKE CONCAT('%', :id, '%')) " +
                "AND (c.approveStatus is NULL OR cast(c.approveStatus as string) LIKE CONCAT('%', :status, '%'))";
        return em.createQuery(query, Comment.class)
                .setParameter("id", id)
                .setParameter("status", status)
                .setFirstResult(ELEMENT_PER_ADMIN_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_ADMIN_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalCommentByProductId(Integer laptopId) {
        String query = "SELECT COUNT(c) FROM Comment c WHERE c.laptop.id = :laptopId";
        return em.createQuery(query, Long.class)
                .setParameter("laptopId", laptopId)
                .getSingleResult();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalCommentByFilter(String id, String status) {
        if (id == null && status == null) {
            String query = "SELECT COUNT(c) FROM Comment c";
            return em.createQuery(query, Long.class).getSingleResult();
        } else {
            String query = "SELECT Count(c) FROM Comment c " +
                    "WHERE (c.id is NULL OR cast(c.id as string) = '' OR cast(c.id as string) LIKE CONCAT('%', :id, '%')) " +
                    "AND (c.approveStatus is NULL OR cast(c.approveStatus as string) LIKE CONCAT('%', :status, '%'))";
            return em.createQuery(query, Long.class)
                    .setParameter("id", id)
                    .setParameter("status", status)
                    .getSingleResult();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Comment> findByPage(Integer page) {
        String query = "SELECT c FROM Comment c ORDER BY c.id DESC";
        return em.createQuery(query, Comment.class)
                .setFirstResult(ELEMENT_PER_ADMIN_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_ADMIN_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void approve(Integer id, CommentReply commentReply) {
        if (commentReply != null) {
            em.persist(commentReply);
        }
        Comment comment = em.find(Comment.class, id);
        if (comment == null) throw new BadRequestException();
        comment.setApproveStatus(true);
        em.merge(comment);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void deny(Integer id) {
        Comment comment = em.find(Comment.class, id);
        comment.setApproveStatus(false);
        em.merge(comment);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        Comment comment = em.find(Comment.class, id);
        if (comment == null) throw new BadRequestException();
        em.remove(comment);
    }
}
