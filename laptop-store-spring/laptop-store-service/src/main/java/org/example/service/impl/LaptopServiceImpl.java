package org.example.service.impl;

import org.example.dao.LaptopRepository;
import org.example.model.Laptop;
import org.example.projection.LaptopOverview;
import org.example.projection.LaptopSummary;
import org.example.service.api.LaptopService;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class LaptopServiceImpl implements LaptopService {
    private static final int SIZE_PER_PAGE = 10;

    @Autowired
    private LaptopRepository laptopRepository;

    @Override
    public Optional<Laptop> findById(Integer id) {
        return laptopRepository.findById(id);
    }

    @Override
    public List<LaptopSummary> findAll(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return laptopRepository.findSummariesByRecordStatusTrue(pageable);
    }

    @Override
    public List<LaptopSummary> findSuggestionsById(Integer id) {
        return laptopRepository.findSuggestionsById(id);
    }

    @Override
    public List<LaptopSummary> findByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return laptopRepository.findSummariesByRecordStatusTrue(pageable);
    }

    @Override
    public List<LaptopSummary> findMostDiscountByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("discountPrice").descending());
        return laptopRepository.findSummariesByRecordStatusTrue(pageable);
    }

    @Override
    public List<LaptopSummary> findCheapestByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("unitPrice"));
        return laptopRepository.findSummariesByRecordStatusTrue(pageable);
    }

    @Override
    public List<LaptopSummary> findBestSellingByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE);
        return laptopRepository.findBestSelling(pageable);
    }

    @Override
    public byte[] findImageById(Integer id, ImageType type) {
        switch (type) {
            case LAPTOP_LARGE_IMAGE:
                return laptopRepository.findLargeImageById(id);
            case LAPTOP_IMAGE:
                return laptopRepository.findImageById(id);
            case LAPTOP_THUMBNAIL:
                return laptopRepository.findThumbnailById(id);
            default:
                return null;
        }
    }

    @Override
    public List<LaptopOverview> findOverviewsByIds(List<Integer> ids) {
        return laptopRepository.findOverviewsByRecordStatusTrueAndIdIn(ids);
    }
}