package org.example.dao.custom;

import org.example.util.Pair;

import java.util.List;
import java.util.Set;

public interface LaptopPromotionRepository {
    List<Pair<Integer, Integer>> findKeysByLaptopIdsOrderByPromotionId(Set<Integer> laptopIds);
}
