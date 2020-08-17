package org.example.service.api;

import org.example.model.Laptop;
import org.example.projection.LaptopBlockData;
import org.example.projection.LaptopRowData;
import org.example.type.ImageType;

import java.util.List;
import java.util.Optional;

public interface LaptopService {
    Optional<Laptop> findById(Integer id);

    List<LaptopRowData> findSuggestionsById(Integer id);

    List<LaptopRowData> findByPage(int page);

    List<LaptopRowData> findMostDiscountByPage(int page);

    List<LaptopRowData> findCheapestByPage(int page);

    List<LaptopRowData> findBestSellingByPage(int page);

    List<LaptopBlockData> findBlockDataByIds(List<Integer> ids);

    byte[] findImageById(Integer id, ImageType type);
}
