package org.example.service.api;

import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.model.Laptop;
import org.example.projection.LaptopBlockData;
import org.example.type.ImageType;

import java.util.List;
import java.util.Optional;

public interface LaptopService {
    Optional<Laptop> findById(Integer id);

    List<LaptopOverviewDTO> findSuggestionsById(Integer id);

    List<LaptopOverviewDTO> findByPage(int page);

    List<LaptopOverviewDTO> findMostDiscountByPage(int page);

    List<LaptopOverviewDTO> findCheapestByPage(int page);

    List<LaptopOverviewDTO> findBestSellingByPage(int page);

    List<LaptopOverviewDTO> findByIds(List<Integer> ids);

    LaptopDetailDTO findDetailById(int id);

    byte[] findImageById(Integer id, ImageType type);
}
