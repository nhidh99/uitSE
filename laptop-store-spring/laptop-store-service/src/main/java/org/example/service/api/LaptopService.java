package org.example.service.api;

import org.example.model.Laptop;
import org.example.type.ImageType;

import java.util.List;

public interface LaptopService {
    List<Laptop> findByPage(int page);

    List<Laptop> findMostDiscountByPage(int page);

    List<Laptop> findCheapestByPage(int page);

    List<Laptop> findBestSellingByPage(int page);

    byte[] findLaptopImage(Integer id, ImageType type);
}
