package org.example.dao.custom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class CustomRatingRepositoryImpl implements CustomRatingRepository {

    @PersistenceContext
    private EntityManager em;

    private static final Integer MAX_RATING_POINT = 5;

    @Override
    public int[] findRatingPointCountsByLaptopId(Integer laptopId) {
        String query = "SELECT r.point, COUNT(r) " +
                "FROM Rating r JOIN r.laptop l " +
                "WHERE l.id = :laptopId " +
                "AND r.approveStatus = true " +
                "GROUP BY l.id, r.point";

        List<Object[]> list = em.createQuery(query)
                .setParameter("laptopId", laptopId)
                .getResultList();

        int[] output = new int[MAX_RATING_POINT];
        list.forEach(pair -> {
            Integer point = (Integer) pair[0];
            Long count = (Long) pair[1];
            output[MAX_RATING_POINT - point] = count.intValue();
        });
        return output;
    }
}
