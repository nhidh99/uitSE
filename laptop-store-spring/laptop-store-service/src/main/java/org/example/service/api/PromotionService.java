package org.example.service.api;

import org.example.model.Promotion;

import java.util.List;

public interface PromotionService {
    List<Promotion> findByLaptopId(Integer laptopId);

    byte[] findImageById(Integer id);
}
