package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.LaptopDAO;
import org.example.filter.LaptopSearchFilter;
import org.example.model.Laptop;
import org.example.type.ImageType;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.*;

@Transactional
@NoArgsConstructor
@AllArgsConstructor

public class LaptopDAOImpl implements LaptopDAO {
    private static final Integer ELEMENT_PER_ADMIN_BLOCK = 5;
    private static final Integer ELEMENT_PER_FILTER_BLOCK = 10;
    private static final Integer ELEMENT_PER_SUGGEST = 5;

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Laptop laptop) {
        if (laptop.getId() == null) {
            insert(laptop);
        } else {
            update(laptop);
        }
    }

    private void insert(Laptop laptop) {
        laptop.setAvgRating(5.0f);
        em.merge(laptop);
    }

    private void update(Laptop laptop) {
        Laptop oldLaptop = findById(laptop.getId()).orElseThrow(BadRequestException::new);
        if (laptop.getImage() == null) {
            laptop.setImage(oldLaptop.getImage());
            laptop.setThumbnail(oldLaptop.getThumbnail());
        }
        laptop.setAvgRating(oldLaptop.getAvgRating());
        em.merge(laptop);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByPage(Integer page) {
        String query = "SELECT l FROM Laptop l WHERE l.recordStatus = true ORDER BY l.id DESC";
        return em.createQuery(query, Laptop.class)
                .setFirstResult(ELEMENT_PER_ADMIN_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_ADMIN_BLOCK)
                .getResultList();
    }


    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findBySelling(Integer page) {
        String query = "SELECT * FROM laptop l " +
                "JOIN best_selling_laptop bsl " +
                "ON l.id = bsl.id " +
                "WHERE l.record_status = true";
        return em.createNativeQuery(query, Laptop.class)
                .setFirstResult(ELEMENT_PER_FILTER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_FILTER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByCreatedDateDesc(Integer page) {
        String query = "SELECT l FROM Laptop l WHERE l.recordStatus = true ORDER BY l.id DESC";
        return em.createQuery(query, Laptop.class)
                .setFirstResult(ELEMENT_PER_FILTER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_FILTER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByDiscountDesc(Integer page) {
        String query = "SELECT l FROM Laptop l WHERE l.recordStatus = true ORDER BY l.discountPrice DESC";
        return em.createQuery(query, Laptop.class)
                .setFirstResult(ELEMENT_PER_FILTER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_FILTER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByPriceAsc(Integer page) {
        String query = "SELECT l FROM Laptop l WHERE l.recordStatus = true ORDER BY l.unitPrice ASC";
        return em.createQuery(query, Laptop.class)
                .setFirstResult(ELEMENT_PER_FILTER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_FILTER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findSuggestionsByLaptop(Integer laptopId) {
        String query = "CALL laptop_suggest(:laptopId, :maxResults)";
        return em.createNativeQuery(query, Laptop.class)
                .setParameter("laptopId", laptopId)
                .setParameter("maxResults", ELEMENT_PER_SUGGEST)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        Laptop laptop = em.find(Laptop.class, id);
        if (laptop == null) throw new BadRequestException();
        laptop.setRecordStatus(false);
        em.merge(laptop);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Laptop> findById(Integer id) {
        Laptop laptop = em.find(Laptop.class, id);
        return Optional.of(laptop);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByFilter(String filter, Integer page) {
        String query = "SELECT * FROM Laptop l WHERE l.id = ? OR l.name LIKE CONCAT('%',?,'%') AND l.record_status = true";
        return em.createNativeQuery(query, Laptop.class)
                .setParameter(1, filter)
                .setParameter(2, filter)
                .setFirstResult(ELEMENT_PER_ADMIN_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_ADMIN_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByFilter(LaptopSearchFilter laptopSearchFilter) {
        return laptopSearchFilter.getName() != null
                ? findByNameQuery(laptopSearchFilter.getName())
                : findBySearchFilter(laptopSearchFilter);
    }

    private List<Laptop> findByNameQuery(String nameQuery) {
        String query = "SELECT * FROM Laptop l WHERE l.name LIKE CONCAT('%',?,'%') AND l.record_status = true";
        return em.createNativeQuery(query, Laptop.class).setParameter(1, nameQuery).getResultList();
    }

    private List<Laptop> findBySearchFilter(LaptopSearchFilter laptopSearchFilter) {
        String query;
        Map<String, Object> params = new HashMap<>();
        if (laptopSearchFilter.getTags().isEmpty()) {
            query = "SELECT DISTINCT(l) FROM Laptop l WHERE l.recordStatus = true";
        } else {
            query = "SELECT DISTINCT(l) FROM Laptop l, IN (l.tags) t WHERE t.id in :tags AND l.recordStatus = true";
            params.put("tags", laptopSearchFilter.getTags());
        }

        if (laptopSearchFilter.getPrice() != null) {
            Long minPrice, maxPrice;
            switch (laptopSearchFilter.getPrice()) {
                case 1:
                    minPrice = 0L;
                    maxPrice = 15_000_000L;
                    break;
                case 2:
                    minPrice = 15_000_000L;
                    maxPrice = 20_000_000L;
                    break;
                case 3:
                    minPrice = 20_000_000L;
                    maxPrice = 25_000_000L;
                    break;
                case 4:
                    minPrice = 25_000_000L;
                    maxPrice = Long.MAX_VALUE;
                    break;
                default:
                    minPrice = null;
                    maxPrice = null;
                    break;
            }
            query += " AND l.unitPrice >= :minPrice AND l.unitPrice < :maxPrice";
            params.put("minPrice", minPrice);
            params.put("maxPrice", maxPrice);
        }

        if (!laptopSearchFilter.getBrands().isEmpty()) {
            query += " AND l.brand IN :brands";
            params.put("brands", laptopSearchFilter.getBrands());
        }

        if (!laptopSearchFilter.getCpus().isEmpty()) {
            query += " AND l.cpu.type IN :cpus";
            params.put("cpus", laptopSearchFilter.getCpus());
        }

        if (!laptopSearchFilter.getRams().isEmpty()) {
            query += " AND l.ram.size IN :rams";
            params.put("rams", laptopSearchFilter.getRams());
        }

        TypedQuery<Laptop> typedQuery = em.createQuery(query, Laptop.class);
        for (String key : params.keySet()) {
            typedQuery.setParameter(key, params.get(key));
        }
        return typedQuery.getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalLaptops(String filter) {
        if (filter == null) {
            String query = "SELECT COUNT(l) FROM Laptop l WHERE l.recordStatus = true";
            return em.createQuery(query, Long.class).getSingleResult();
        } else {
            String query = "SELECT COUNT(*) FROM Laptop l WHERE l.id = ? OR l.name LIKE CONCAT('%',?,'%') AND l.record_status = true";
            return ((Number) em.createNativeQuery(query)
                    .setParameter(1, filter)
                    .setParameter(2, filter)
                    .getSingleResult()).longValue();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByIds(List<Integer> ids) {
        if (ids.isEmpty()) return new ArrayList<>();
        String query = "SELECT l FROM Laptop l WHERE l.id IN :ids AND l.recordStatus = true";
        return em.createQuery(query, Laptop.class)
                .setParameter("ids", ids)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public byte[] findImageById(Integer id, ImageType type) {
        Laptop laptop = em.find(Laptop.class, id);
        if (laptop == null) return null;
        switch (type) {
            case LAPTOP_BIG_IMAGE:
                return laptop.getBigImage();
            case LAPTOP_IMAGE:
                return laptop.getImage();
            case LAPTOP_THUMBNAIL:
                return laptop.getThumbnail();
            default:
                return null;
        }
    }
}
