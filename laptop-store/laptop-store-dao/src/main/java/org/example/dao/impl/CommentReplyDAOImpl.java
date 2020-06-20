package org.example.dao.impl;

import org.example.dao.api.CommentReplyDAO;
import org.example.model.CommentReply;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

public class CommentReplyDAOImpl implements CommentReplyDAO {
    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(CommentReply commentReply) {
        em.persist(commentReply);
    }
}
