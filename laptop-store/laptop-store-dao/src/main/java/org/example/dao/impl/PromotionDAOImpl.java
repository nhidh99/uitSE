package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.PromotionDAO;
import org.example.model.Promotion;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@NoArgsConstructor
@AllArgsConstructor
public class PromotionDAOImpl implements PromotionDAO {
    private static final Integer ELEMENT_PER_BLOCK = 5;

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findAll() {
        String query = "SELECT p FROM Promotion p WHERE p.recordStatus = true ORDER BY p.id DESC";
        return em.createQuery(query, Promotion.class).getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByPage(Integer page) {
        String query = "SELECT p FROM Promotion p WHERE p.recordStatus = true ORDER BY p.id DESC";
        return em.createQuery(query, Promotion.class)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByIds(List<Integer> ids) {
        if (ids.isEmpty()) return new ArrayList<>();
        String query = "SELECT p FROM Promotion p WHERE p.id IN :ids AND p.recordStatus = true";
        return em.createQuery(query, Promotion.class)
                .setParameter("ids", ids)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByFilter(String filter, Integer page) {
        String query = "SELECT * FROM Promotion p WHERE p.id = ? OR p.name LIKE CONCAT('%',?,'%') AND p.record_status = true";
        return em.createNativeQuery(query, Promotion.class)
                .setParameter(1, filter)
                .setParameter(2, filter)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalPromotions(String filter) {
        if (filter == null) {
            String query = "SELECT COUNT(p) FROM Promotion p WHERE p.recordStatus = true";
            return em.createQuery(query, Long.class).getSingleResult();
        } else {
            String query = "SELECT COUNT(*) FROM Promotion p WHERE p.id = ? OR p.name LIKE CONCAT('%',?,'%') AND p.record_status = true";
            return ((Number) em.createNativeQuery(query)
                    .setParameter(1, filter)
                    .setParameter(2, filter)
                    .getSingleResult()).longValue();
        }
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Promotion promotion) {
        if (promotion.getId() == null) {
            insert(promotion);
        } else {
            update(promotion);
        }
    }

    private void insert(Promotion promotion) {
        em.persist(promotion);
    }

    private void update(Promotion promotion) {
        Promotion oldPromotion = findById(promotion.getId()).orElseThrow(BadRequestException::new);
        promotion.setImage(Optional.ofNullable(promotion.getImage()).orElse(oldPromotion.getImage()));
        promotion.setLaptops(oldPromotion.getLaptops());
        em.merge(promotion);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        Promotion promotion = em.find(Promotion.class, id);
        if (promotion == null) throw new BadRequestException();
        promotion.setRecordStatus(false);
        promotion.setLaptops(null);
        em.merge(promotion);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Promotion> findById(Integer id) {
        Promotion promotion = em.find(Promotion.class, id);
        return Optional.ofNullable(promotion);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByLaptopId(Integer laptopId) {
        String query = "SELECT p FROM Promotion p JOIN p.laptops l WHERE l.id = :laptopId AND p.recordStatus = true";
        return em.createQuery(query, Promotion.class).setParameter("laptopId", laptopId).getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public byte[] findImageById(Integer id) {
        Promotion promotion = em.find(Promotion.class, id);
        if (promotion == null) return null;
        return promotion.getImage();
    }
}