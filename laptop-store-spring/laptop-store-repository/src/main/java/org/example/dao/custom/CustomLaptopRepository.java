package org.example.dao.custom;

import org.example.input.query.LaptopFilterInput;
import org.example.model.Laptop;

import java.util.List;

public interface CustomLaptopRepository {
    List<Laptop> findAndCountLaptopOverviewsByFilter(LaptopFilterInput filter);

    List<Laptop> findByName(LaptopFilterInput search);

    Long countByFilter(LaptopFilterInput filter);
}
