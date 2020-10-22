package org.example.service.api;

import org.example.type.ImageType;

import java.util.List;

public interface LaptopImageService {
    List<Integer> findIdsByLaptopId(Integer laptopId);

    byte[] findImageById(Integer id, ImageType type);
}
