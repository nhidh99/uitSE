package org.example.dao.api;

import org.example.filter.LaptopSearchFilter;
import org.example.model.Laptop;
import org.example.type.ImageType;

import java.util.List;
import java.util.Optional;

public interface LaptopDAO {
    void save(Laptop laptop);

    void delete(Integer id);

    List<Laptop> findByPage(Integer page);

    List<Laptop> findBySelling(Integer page);

    List<Laptop> findByCreatedDateDesc(Integer page);

    List<Laptop> findByDiscountDesc(Integer page);

    List<Laptop> findByPriceAsc(Integer page);

    List<Laptop> findSuggestionsByLaptop(Integer laptopId);

    List<Laptop> findByFilter(String filter, Integer page);

    List<Laptop> findByFilter(LaptopSearchFilter laptopSearchFilter);

    Long findTotalLaptops(String filter);

    List<Laptop> findByIds(List<Integer> ids);

    Optional<Laptop> findById(Integer id);

    byte[] findImageById(Integer id, ImageType type);
}