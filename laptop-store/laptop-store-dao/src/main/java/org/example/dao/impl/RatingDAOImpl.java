package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.RatingDAO;
import org.example.model.Laptop;
import org.example.model.Rating;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.List;
import java.util.Optional;

@Transactional
@NoArgsConstructor
@AllArgsConstructor
public class RatingDAOImpl implements RatingDAO {

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Rating> findById(Integer id) {
        Rating rating = em.find(Rating.class, id);
        return Optional.of(rating);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Rating rating) {
        em.persist(rating);
        Integer laptopId = rating.getLaptop().getId();
        Laptop laptop = em.find(Laptop.class, laptopId);
        Float avgRating = findAvgRatingByProductId(laptopId);
        laptop.setAvgRating(avgRating);
        em.merge(laptop);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Rating> findByProductId(Integer laptopId) {
        String query = "SELECT r FROM Rating r " +
                "WHERE r.laptop.id = :laptopId " +
                "AND r.approveStatus = true " +
                "AND (r.commentTitle is not null OR r.commentDetail is not null)";
        return em.createQuery(query, Rating.class)
                .setParameter("laptopId", laptopId)
                .getResultList();
    }

    @Override
    public List<Rating> findByFilter(String id, String status, Integer page) {
        String query = "SELECT r FROM Rating r " +
                "WHERE (r.id is NULL OR cast(r.id as string) = '' OR cast(r.id as string) LIKE CONCAT('%', :id, '%')) " +
                "AND (r.approveStatus is NULL OR cast(r.approveStatus as string) LIKE CONCAT('%', :status, '%'))";
        return em.createQuery(query, Rating.class)
                .setParameter("id", id)
                .setParameter("status", status)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalRatingByProductId(Integer laptopId) {
        String query = "SELECT COUNT(r) FROM Rating r " +
                "WHERE r.laptop.id = :laptopId " +
                "AND r.approveStatus = true " +
                "AND (r.commentTitle is not null OR r.commentDetail is not null)";
        return em.createQuery(query, Long.class)
                .setParameter("laptopId", laptopId)
                .getSingleResult();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalRatingByFilter(String id, String status) {
        if (id == null && status == null) {
            String query = "SELECT COUNT(r) FROM Rating r";
            return em.createQuery(query, Long.class).getSingleResult();
        } else {
            String query = "SELECT Count(r) FROM Rating r " +
                    "WHERE (r.id is NULL OR cast(r.id as string) = '' OR cast(r.id as string) LIKE CONCAT('%', :id, '%')) " +
                    "AND (r.approveStatus is NULL OR cast(r.approveStatus as string) LIKE CONCAT('%', :status, '%'))";
            return em.createQuery(query, Long.class)
                    .setParameter("id", id)
                    .setParameter("status", status)
                    .getSingleResult();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Rating> findAll() {
        String query = "SELECT r FROM Rating r";
        return em.createQuery(query, Rating.class)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Float findAvgRatingByProductId(Integer laptopId) {
        String query = "SELECT AVG(r.rating) FROM Rating r WHERE r.laptop.id = :laptopId";
        return em.createQuery(query, Double.class)
                .setParameter("laptopId", laptopId)
                .getSingleResult().floatValue();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        Rating rating = em.find(Rating.class, id);
        if (rating == null) throw new BadRequestException();
        em.remove(rating);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void approve(Integer id) {
        Rating rating = em.find(Rating.class, id);
        if (rating == null) throw new BadRequestException();
        rating.setApproveStatus(!rating.isApproveStatus());
        em.merge(rating);
    }
}
