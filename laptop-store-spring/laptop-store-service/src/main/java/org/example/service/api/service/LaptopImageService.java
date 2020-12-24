package org.example.service.api.service;

import org.example.type.ImageResolutionType;
import org.example.type.ImageType;

public interface LaptopImageService {
    byte[] findLaptopImageById(Integer id, ImageResolutionType resolutionType, ImageType imageType);
}