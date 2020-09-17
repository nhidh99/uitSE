package org.example.service.impl;

import org.example.dao.model.LaptopRepository;
import org.example.model.Laptop;
import org.example.projection.LaptopBlockData;
import org.example.service.api.LaptopService;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LaptopServiceImpl implements LaptopService {
    private static final int SIZE_PER_PAGE = 10;

    @Autowired
    private LaptopRepository laptopRepository;

    @Override
    public Optional<Laptop> findById(Integer id) {
        return laptopRepository.findById(id);
    }

    @Override
    public List<LaptopBlockData> findSuggestionsById(Integer id) {
        List<Integer> suggestionIds = laptopRepository.findSuggestionIdsById(id);
        return laptopRepository.findBlockDataByRecordStatusTrueAndIdIn(suggestionIds);
    }

    @Override
    public List<LaptopBlockData> findByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return laptopRepository.findBlockDataByRecordStatusTrue(pageable);
    }

    @Override
    public List<LaptopBlockData> findMostDiscountByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("discountPrice").descending());
        return laptopRepository.findBlockDataByRecordStatusTrue(pageable);
    }

    @Override
    public List<LaptopBlockData> findCheapestByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("unitPrice"));
        return laptopRepository.findBlockDataByRecordStatusTrue(pageable);
    }

    @Override
    public List<LaptopBlockData> findBestSellingByPage(int page) {
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
    public List<LaptopBlockData> findBlockDataByIds(List<Integer> ids) {
        return laptopRepository.findBlockDataByRecordStatusTrueAndIdIn(ids);
    }
}