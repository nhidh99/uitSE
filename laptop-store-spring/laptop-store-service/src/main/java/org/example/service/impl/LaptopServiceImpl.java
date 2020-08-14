package org.example.service.impl;

import org.example.dao.LaptopRepository;
import org.example.model.Laptop;
import org.example.service.api.LaptopService;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LaptopServiceImpl implements LaptopService {
    private static final int SIZE_PER_PAGE = 10;

    @Autowired
    private LaptopRepository laptopRepository;

    @Override
    public List<Laptop> findByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return laptopRepository.findByRecordStatusTrue(pageable);
    }

    @Override
    public List<Laptop> findMostDiscountByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("discountPrice").descending());
        return laptopRepository.findByRecordStatusTrue(pageable);
    }

    @Override
    public List<Laptop> findCheapestByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("unitPrice"));
        return laptopRepository.findByRecordStatusTrue(pageable);
    }

    @Override
    public List<Laptop> findBestSellingByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE);
        return laptopRepository.findBestSelling(pageable);
    }

    @Override
    public byte[] findLaptopImage(Integer id, ImageType type) {
        return laptopRepository.findImageById(id, type);
    }
}