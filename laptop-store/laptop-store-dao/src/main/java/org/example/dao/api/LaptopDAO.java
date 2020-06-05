package org.example.dao.api;

import org.example.model.Laptop;

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

    Long findTotalLaptops();

    List<Laptop> findByIds(List<Integer> ids);

    Optional<Laptop> findById(Integer id);

    byte[] findImageById(Integer id);

    byte[] findThumbnailById(Integer id);
}