package org.example.service.api.creator;

import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopSpecDTO;

public interface LaptopCreator {
    LaptopSpecDTO createLaptopSpec(Integer laptopId);

    LaptopDetailDTO createLaptopDetail(Integer laptopId);
}
