package org.example.service.impl;

import org.example.dao.PromotionRepository;
import org.example.model.Promotion;
import org.example.service.api.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PromotionServiceImpl implements PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public List<Promotion> findByLaptopId(Integer laptopId) {
        return promotionRepository.findRowDataByRecordStatusTrueAndLaptopsId(laptopId);
    }

    @Override
    public byte[] findImageById(Integer id) {
        return promotionRepository.findImageById(id);
    }
}
