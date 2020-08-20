package org.example.service.api;

import org.example.model.Laptop;
import org.example.projection.LaptopOverview;
import org.example.projection.LaptopSummary;
import org.example.type.ImageType;

import java.util.List;
import java.util.Optional;

public interface LaptopService {
    Optional<Laptop> findById(Integer id);

    List<LaptopSummary> findAll(int page);

    List<LaptopSummary> findSuggestionsById(Integer id);

    List<LaptopSummary> findByPage(int page);

    List<LaptopSummary> findMostDiscountByPage(int page);

    List<LaptopSummary> findCheapestByPage(int page);

    List<LaptopSummary> findBestSellingByPage(int page);

    List<LaptopOverview> findOverviewsByIds(List<Integer> ids);

    byte[] findImageById(Integer id, ImageType type);
}
