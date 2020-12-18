package org.example.service.api;

import org.example.type.ImageResolutionType;
import org.example.type.ImageType;

public interface LaptopImageService {
    byte[] findImageById(Integer id, ImageResolutionType resolutionType, ImageType imageType);
}