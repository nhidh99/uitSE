package org.example.service.api;

import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.laptop.LaptopSpecDTO;
import org.example.dto.laptop.LaptopSummaryDTO;
import org.example.input.LaptopFilterInput;
import org.example.input.SearchInput;
import org.example.type.ImageType;
import org.example.util.Pair;

import java.util.List;

public interface LaptopService {

    <T> Pair<List<T>, Long> findByPage(int page, Class<T> clazz);

    Pair<List<LaptopOverviewDTO>, Long> findMostDiscountByPage(int page);

    Pair<List<LaptopOverviewDTO>, Long> findCheapestByPage(int page);

    Pair<List<LaptopOverviewDTO>, Long> findBestSellingByPage(int page);

    List<LaptopOverviewDTO> findByIds(List<Integer> ids);

    LaptopDetailDTO findDetailById(int id);

    LaptopSpecDTO findSpecById(int id);

    byte[] findImageById(Integer id, ImageType type);

    Pair<List<LaptopOverviewDTO>, Long> findByFilter(LaptopFilterInput filter);

    Pair<List<LaptopSummaryDTO>, Long> findBySearch(SearchInput search);

    Pair<List<LaptopSpecDTO>, Long> findAllLaptopSpec();
}