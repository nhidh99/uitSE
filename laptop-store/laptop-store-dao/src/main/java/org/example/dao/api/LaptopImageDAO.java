package org.example.dao.api;

import org.example.model.LaptopImage;
import org.example.type.ImageType;

import java.util.List;

public interface LaptopImageDAO {
    void update(List<LaptopImage> uploadedImages, List<LaptopImage> deletedImages);

    void delete(Integer id);

    byte[] findImageById(Integer id, ImageType type);

    List<Integer> findIdsByLaptopId(Integer laptopId);

    List<LaptopImage> findByIds(List<Integer> deletedImageIds);
}
