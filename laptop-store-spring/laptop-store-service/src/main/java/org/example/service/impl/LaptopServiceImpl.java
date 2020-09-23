package org.example.service.impl;

import org.example.dao.model.LaptopRepository;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.model.Laptop;
import org.example.service.api.LaptopService;
import org.example.type.ImageType;
import org.example.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class LaptopServiceImpl implements LaptopService {
    private static final int SIZE_PER_PAGE = 10;

    private final LaptopRepository laptopRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public LaptopServiceImpl(LaptopRepository laptopRepository, PlatformTransactionManager txManager) {
        this.laptopRepository = laptopRepository;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public Optional<Laptop> findById(Integer id) {
        return laptopRepository.findById(id);
    }

    @Override
    public List<LaptopOverviewDTO> findSuggestionsById(Integer id) {
        return txTemplate.execute((status) -> {
            List<Integer> suggestionIds = laptopRepository.findSuggestionIdsById(id);
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(suggestionIds);
            return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
        });
    }

    @Override
    public List<LaptopOverviewDTO> findByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
        });
    }

    @Override
    public List<LaptopOverviewDTO> findMostDiscountByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("discountPrice").descending());
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
        });
    }

    @Override
    public List<LaptopOverviewDTO> findCheapestByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE, Sort.by("unitPrice"));
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
        });
    }

    @Override
    public List<LaptopOverviewDTO> findBestSellingByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_PAGE);
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findBestSelling(pageable);
            return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
        });
    }

    @Override
    public List<LaptopOverviewDTO> findByIds(List<Integer> ids) {
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(ids);
            return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
        });
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
}