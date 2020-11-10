package org.example.service.impl;

import org.example.dao.LaptopDetailImageRepository;
import org.example.service.api.ImageService;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class LaptopImageServiceImpl implements ImageService {

    private final LaptopDetailImageRepository laptopDetailImageRepository;

    @Autowired
    public LaptopImageServiceImpl(LaptopDetailImageRepository laptopDetailImageRepository) {
        this.laptopDetailImageRepository = laptopDetailImageRepository;
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
                throw new NoSuchElementException();
        }
    }
}
