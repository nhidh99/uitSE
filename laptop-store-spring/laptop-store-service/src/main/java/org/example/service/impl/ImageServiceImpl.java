package org.example.service.impl;

import org.example.dao.LaptopRepository;
import org.example.input.ImageInput;
import org.example.service.api.ImageService;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ImageServiceImpl implements ImageService {
    @Autowired
    private LaptopRepository laptopRepository;

    @Override
    public byte[] findLaptopImage(ImageInput imageInput, ImageType type) {
        return laptopRepository.findImageById(imageInput.getId(), type);
    }
}
