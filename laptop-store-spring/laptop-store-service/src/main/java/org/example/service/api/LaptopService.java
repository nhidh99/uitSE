package org.example.service.api;

import org.example.model.Laptop;
import org.example.projection.LaptopBlockData;
import org.example.type.ImageType;

import java.util.List;
import java.util.Optional;

public interface LaptopService {
    Optional<Laptop> findById(Integer id);

    List<LaptopBlockData> findSuggestionsById(Integer id);
    List<LaptopBlockData> findAll(int page);

    List<LaptopBlockData> findByPage(int page);

    List<LaptopBlockData> findMostDiscountByPage(int page);

    List<LaptopBlockData> findCheapestByPage(int page);

    List<LaptopBlockData> findBestSellingByPage(int page);

    List<LaptopBlockData> findBlockDataByIds(List<Integer> ids);

    byte[] findImageById(Integer id, ImageType type);
}
