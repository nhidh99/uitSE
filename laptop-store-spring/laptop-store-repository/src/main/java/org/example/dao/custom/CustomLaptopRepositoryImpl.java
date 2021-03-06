package org.example.dao.custom;

import org.example.constant.PaginateConstants;
import org.example.input.query.LaptopFilterInput;
import org.example.model.Laptop;
import org.example.type.FilterTargetType;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.*;
import java.util.Map;

public class CustomLaptopRepositoryImpl implements CustomLaptopRepository {

    @PersistenceContext
    private EntityManager em;

    private static final String LAPTOP_SELECT_QUERY = "SELECT l FROM Laptop l";
    private static final String LAPTOP_COUNT_QUERY = "SELECT COUNT(l) FROM Laptop l";

    @Override
    public List<Laptop> findByName(LaptopFilterInput filter) {
        StringBuilder sb = new StringBuilder("SELECT l FROM Laptop l WHERE l.name LIKE '%'||:name||'%' AND l.recordStatus = true");
        Map<String, Object> params = new HashMap<>();
        buildFilterByOrder(sb, params, filter.getTarget());
        params.put("name", filter.getName());

        TypedQuery<Laptop> typedQuery = em.createQuery(sb.toString(), Laptop.class);
        for (String key : params.keySet()) {
            typedQuery.setParameter(key, params.get(key));
        }
        return typedQuery.setFirstResult(PaginateConstants.LAPTOP_PER_USER_PAGE * (filter.getPage() - 1))
                .setMaxResults(PaginateConstants.LAPTOP_PER_USER_PAGE).getResultList();
    }

    @Override
    public List<Laptop> findAndCountLaptopsByFilter(LaptopFilterInput filter) {
        TypedQuery<Laptop> typedQuery = buildFilterQuery(LAPTOP_SELECT_QUERY, filter, Laptop.class);
        return typedQuery
                .setFirstResult(PaginateConstants.LAPTOP_PER_USER_PAGE * (filter.getPage() - 1))
                .setMaxResults(PaginateConstants.LAPTOP_PER_USER_PAGE).getResultList();
    }

    @Override
    public Long countByFilter(LaptopFilterInput filter) {
        TypedQuery<Long> typedQuery = buildFilterQuery(LAPTOP_COUNT_QUERY, filter, Long.class);
        return typedQuery.getSingleResult();
    }

    private <T> TypedQuery<T> buildFilterQuery(String selectQuery, LaptopFilterInput filter, Class<T> clazz) {
        StringBuilder sb = new StringBuilder(selectQuery);
        Map<String, Object> params = new HashMap<>();
        buildFilterByTags(sb, params, filter);
        buildFilterByPrice(sb, params, filter);
        buildFilterByBrands(sb, params, filter);
        buildFilterByCPUs(sb, params, filter);
        buildFilterByRams(sb, params, filter);

        if (selectQuery.equals(LAPTOP_SELECT_QUERY)) {
            buildFilterByOrder(sb, params, filter.getTarget());
        }

        TypedQuery<T> typedQuery = em.createQuery(sb.toString(), clazz);
        for (String key : params.keySet()) {
            typedQuery.setParameter(key, params.get(key));
        }
        return typedQuery;
    }

    private void buildFilterByTags(StringBuilder sb, Map<String, Object> params, LaptopFilterInput filter) {
        if (filter.getTags().isEmpty()) {
            sb.append(" WHERE l.recordStatus = true");
        } else {
            sb.append(" WHERE l.id IN (SELECT DISTINCT(t.laptop.id)")
                    .append(" FROM LaptopTag t")
                    .append(" WHERE t.tag IN :tags)")
                    .append(" AND l.recordStatus = true");
            params.put("tags", filter.getTags());
        }
    }

    private void buildFilterByPrice(StringBuilder sb, Map<String, Object> params, LaptopFilterInput filter) {
        if (filter.getPrice() != null) {
            Long minPrice, maxPrice;
            switch (filter.getPrice()) {
                case 1:
                    minPrice = 0L;
                    maxPrice = 10_000_000L;
                    break;
                case 2:
                    minPrice = 10_000_000L;
                    maxPrice = 15_000_000L;
                    break;
                case 3:
                    minPrice = 15_000_000L;
                    maxPrice = 20_000_000L;
                    break;
                case 4:
                    minPrice = 20_000_000L;
                    maxPrice = 25_000_000L;
                    break;
                case 5:
                    minPrice = 25_000_000L;
                    maxPrice = Long.MAX_VALUE;
                    break;
                default:
                    minPrice = null;
                    maxPrice = null;
                    break;
            }
            sb.append(" AND l.unitPrice >= :minPrice AND l.unitPrice < :maxPrice");
            params.put("minPrice", minPrice);
            params.put("maxPrice", maxPrice);
        }
    }

    private void buildFilterByBrands(StringBuilder sb, Map<String, Object> params, LaptopFilterInput filter) {
        if (!filter.getBrands().isEmpty()) {
            sb.append(" AND l.brand IN :brands");
            params.put("brands", filter.getBrands());
        }
    }

    private void buildFilterByCPUs(StringBuilder sb, Map<String, Object> params, LaptopFilterInput filter) {
        if (!filter.getCpus().isEmpty()) {
            sb.append(" AND l.cpu.type IN :cpus");
            params.put("cpus", filter.getCpus());
        }
    }

    private void buildFilterByRams(StringBuilder sb, Map<String, Object> params, LaptopFilterInput filter) {
        if (!filter.getRams().isEmpty()) {
            sb.append(" AND l.ram.size IN :rams");
            params.put("rams", filter.getRams());
        }
    }

    private void buildFilterByOrder(StringBuilder sb, Map<String, Object> params, FilterTargetType sort) {
        sb.append(" ORDER BY");
        switch (sort) {
            case BEST_SELLING:
                sb.append(" l.soldQuantity DESC");
                break;
            case LOW_PRICE:
                sb.append(" l.unitPrice ASC");
                break;
            case HIGH_PRICE:
                sb.append(" l.unitPrice DESC");
                break;
            case LATEST:
                sb.append(" l.id DESC");
                break;
        }
    }
}