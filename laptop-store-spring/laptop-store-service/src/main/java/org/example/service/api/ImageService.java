package org.example.service.api;

import org.example.type.ImageType;

import java.util.List;

public interface ImageService {
    byte[] findImageById(Integer id, ImageType type);
}