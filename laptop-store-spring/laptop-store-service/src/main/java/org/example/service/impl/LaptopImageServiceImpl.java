package org.example.service.impl;

import org.example.dao.model.LaptopDetailImageRepository;
import org.example.dao.model.LaptopImageRepository;
import org.example.service.api.LaptopImageService;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LaptopImageServiceImpl implements LaptopImageService {

    private final LaptopDetailImageRepository laptopDetailImageRepository;

    @Autowired
    public LaptopImageServiceImpl(LaptopDetailImageRepository laptopDetailImageRepository) {
        this.laptopDetailImageRepository = laptopDetailImageRepository;
    }

    @Override
    public List<Integer> findIdsByLaptopId(Integer laptopId) {
        return laptopDetailImageRepository.findIdsByLaptopId(laptopId);
    }

    @Override
    public byte[] findImageById(Integer id, ImageType type) {
        switch (type) {
            case LAPTOP_LARGE_IMAGE:
                return laptopDetailImageRepository.findLargeImageById(id);
            case LAPTOP_IMAGE:
                return laptopDetailImageRepository.findImageById(id);
            case LAPTOP_THUMBNAIL:
                return laptopDetailImageRepository.findThumbnailById(id);
            default:
                return null;
        }
    }
}
