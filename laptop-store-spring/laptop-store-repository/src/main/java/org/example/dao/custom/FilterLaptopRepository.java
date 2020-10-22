package org.example.dao.custom;

import org.example.input.LaptopFilterInput;
import org.example.input.LaptopSearchInput;
import org.example.model.Laptop;
import org.example.type.SortFilterType;

import java.util.List;

public interface FilterLaptopRepository {
    List<Laptop> findByFilter(LaptopFilterInput filter);

    List<Laptop> findByName(LaptopSearchInput search);

    Long countByFilter(LaptopFilterInput filter);
}
