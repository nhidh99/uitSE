package org.example.service.impl;

import org.example.dao.model.PromotionRepository;
import org.example.model.Promotion;
import org.example.service.api.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public List<Promotion> findByLaptopId(Integer laptopId) {
        return promotionRepository.findByRecordStatusTrueAndLaptopsId(laptopId);
    }

    @Override
    public byte[] findImageById(Integer id) {
        return promotionRepository.findImageById(id);
    }
}
