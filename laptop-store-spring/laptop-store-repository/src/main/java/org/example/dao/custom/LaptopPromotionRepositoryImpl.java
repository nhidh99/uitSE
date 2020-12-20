package org.example.dao.custom;

import org.example.util.Pair;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LaptopPromotionRepositoryImpl implements LaptopPromotionRepository {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Pair<Integer, Integer>> findKeysByLaptopIdsOrderByPromotionId(Set<Integer> laptopIds) {
        String query = "SELECT lp.laptop_id, lp.promotion_id " +
                "FROM laptop_promotion lp " +
                "WHERE lp.laptop_id IN :laptopIds " +
                "ORDER BY lp.promotion_id";
        List<Object[]> list = em.createNativeQuery(query).setParameter("laptopIds", laptopIds).getResultList();
        return list.stream().map(keys -> Pair.of((Integer)keys[0], (Integer)keys[1])).collect(Collectors.toList());
    }
}
