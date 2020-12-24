package org.example.service.impl.service;

import org.example.dao.custom.CustomLaptopImageRepository;
import org.example.service.api.service.LaptopImageService;
import org.example.type.ImageResolutionType;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class LaptopImageServiceImpl implements LaptopImageService {
    private final Map<String, CustomLaptopImageRepository> laptopImageRepositories;

    @Autowired
    public LaptopImageServiceImpl(Map<String, CustomLaptopImageRepository> laptopImageRepositories1) {
        this.laptopImageRepositories = laptopImageRepositories1;
    }

    @Override
    public byte[] findLaptopImageById(Integer id, ImageResolutionType resolutionType, ImageType imageType) {
        CustomLaptopImageRepository repository = getLaptopImageRepository(imageType);
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

    private CustomLaptopImageRepository getLaptopImageRepository(ImageType imageType) {
        String repositoryName = imageType.getRepositoryName();
        return laptopImageRepositories.get(repositoryName);
    }
}
