package org.example.service.impl;

import org.example.dao.LaptopDetailImageRepository;
import org.example.dao.LaptopImageRepository;
import org.example.dao.custom.CustomLaptopImageRepostiory;
import org.example.service.api.LaptopImageService;
import org.example.type.ImageResolutionType;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class LaptopImageServiceImpl implements LaptopImageService {
    private final Map<String, CustomLaptopImageRepostiory> laptopImageRepositories;

    @Autowired
    public LaptopImageServiceImpl(Map<String, CustomLaptopImageRepostiory> laptopImageRepositories1) {
        this.laptopImageRepositories = laptopImageRepositories1;
    }

    @Override
    public byte[] findImageById(Integer id, ImageResolutionType resolutionType, ImageType imageType) {
        CustomLaptopImageRepostiory repository = getLaptopImageRepository(imageType);
        switch (resolutionType) {
            case LAPTOP_LARGE_IMAGE:
                return repository.findLargeImageById(id);
            case LAPTOP_IMAGE:
                return repository.findImageById(id);
            case LAPTOP_THUMBNAIL:
                return repository.findThumbnailById(id);
            default:
                throw new NoSuchElementException();
        }
    }

    private CustomLaptopImageRepostiory getLaptopImageRepository(ImageType imageType) {
        String repositoryName = imageType.getRepositoryName();
        return laptopImageRepositories.get(repositoryName);
    }
}
