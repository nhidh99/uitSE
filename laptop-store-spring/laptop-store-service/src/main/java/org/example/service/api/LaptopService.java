package org.example.service.api;

import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.laptop.LaptopSpecDTO;
import org.example.input.LaptopFilterInput;
import org.example.input.LaptopSearchInput;
import org.example.type.ImageType;
import org.example.util.Pair;

import java.util.List;

public interface LaptopService {

    Pair<List<LaptopOverviewDTO>, Long> findByPage(int page);

    Pair<List<LaptopOverviewDTO>, Long> findMostDiscountByPage(int page);

    Pair<List<LaptopOverviewDTO>, Long> findCheapestByPage(int page);

    Pair<List<LaptopOverviewDTO>, Long> findBestSellingByPage(int page);

    List<LaptopOverviewDTO> findByIds(List<Integer> ids);

    LaptopDetailDTO findDetailById(int id);

    LaptopSpecDTO findSpecById(int id);

    byte[] findImageById(Integer id, ImageType type);

    Pair<List<LaptopOverviewDTO>, Long> findByFilter(LaptopFilterInput filter);

    Pair<List<LaptopOverviewDTO>, Long> findByName(LaptopSearchInput search);
}
