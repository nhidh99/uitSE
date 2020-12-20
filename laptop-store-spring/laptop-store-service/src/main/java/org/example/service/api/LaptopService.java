package org.example.service.api;

import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.laptop.LaptopSpecDTO;
import org.example.dto.laptop.LaptopSummaryDTO;
import org.example.input.query.LaptopFilterInput;
import org.example.input.query.ProductSearchInput;
import org.example.util.Pair;

import java.util.List;

public interface LaptopService {

    <T> Pair<List<T>, Long> findAndCountLatestLaptopsByPage(int page, Class<T> clazz);

    Pair<List<LaptopOverviewDTO>, Long> findAndCountMostDiscountedLaptopOverviewsByPage(int page);

    Pair<List<LaptopOverviewDTO>, Long> findAndCountCheapestLaptopOverviewsByPage(int page);

    Pair<List<LaptopOverviewDTO>, Long> findAndCountBestSellingLaptopOverviewsByPage(int page);

    List<LaptopOverviewDTO> findLaptopOverviewsByIds(List<Integer> ids);

    LaptopDetailDTO findLaptopDetailById(Integer id);

    LaptopSpecDTO findLaptopSpecById(Integer id);

    Pair<List<LaptopOverviewDTO>, Long> findAndCountLaptopOverviewsByFilter(LaptopFilterInput filter);

    Pair<List<LaptopSummaryDTO>, Long> findAndCountLaptopSummariesBySearch(ProductSearchInput search);
}