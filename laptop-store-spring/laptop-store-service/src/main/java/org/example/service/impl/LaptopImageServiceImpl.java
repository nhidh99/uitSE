package org.example.service.impl;

import org.example.dao.model.LaptopImageRepository;
import org.example.service.api.LaptopImageService;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LaptopImageServiceImpl implements LaptopImageService {
    @Autowired
    private LaptopImageRepository laptopImageRepository;

    @Override
    public List<Integer> findIdsByLaptopId(Integer laptopId) {
        return laptopImageRepository.findIdsByLaptopId(laptopId);
    }

    @Override
    public byte[] findImageById(Integer id, ImageType type) {
        switch (type) {
            case LAPTOP_LARGE_IMAGE:
                return laptopImageRepository.findLargeImageById(id);
            case LAPTOP_IMAGE:
                return laptopImageRepository.findImageById(id);
            case LAPTOP_THUMBNAIL:
                return laptopImageRepository.findThumbnailById(id);
            default:
                return null;
        }
    }
}
