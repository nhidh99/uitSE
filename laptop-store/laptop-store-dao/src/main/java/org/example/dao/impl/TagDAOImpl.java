package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.TagDAO;
import org.example.model.Laptop;
import org.example.model.Tag;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@NoArgsConstructor
@AllArgsConstructor
public class TagDAOImpl implements TagDAO {

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Tag> findAll() {
        String query = "SELECT t FROM Tag t";
        return em.createQuery(query, Tag.class).getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Tag> findByIds(List<Integer> ids) {
        if (ids.isEmpty()) return new ArrayList<>();
        String query = "SELECT t FROM Tag t WHERE t.id IN :ids";
        return em.createQuery(query, Tag.class)
                .setParameter("ids", ids)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Tag> findByLaptopId(Integer laptopId) {
        Laptop laptop = em.find(Laptop.class, laptopId);
        if (laptop == null) return null;
        return laptop.getTags();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Tag> findById(Integer id) {
        Tag tag = em.find(Tag.class, id);
        return Optional.ofNullable(tag);
    }
}
