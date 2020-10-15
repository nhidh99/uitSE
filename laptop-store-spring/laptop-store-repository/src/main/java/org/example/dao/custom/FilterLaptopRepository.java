package org.example.dao.custom;

import org.example.input.LaptopFilterInput;
import org.example.model.Laptop;

import java.util.List;

public interface FilterLaptopRepository {
    List<Laptop> findByFilter(LaptopFilterInput filter);

    Long countByFilter(LaptopFilterInput filter);
}
