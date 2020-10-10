package org.example.service.api;

import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.laptop.LaptopSpecDTO;
import org.example.type.ImageType;

import java.util.List;

public interface LaptopService {

    List<LaptopOverviewDTO> findByPage(int page);

    List<LaptopOverviewDTO> findMostDiscountByPage(int page);

    List<LaptopOverviewDTO> findCheapestByPage(int page);

    List<LaptopOverviewDTO> findBestSellingByPage(int page);

    List<LaptopOverviewDTO> findByIds(List<Integer> ids);

    LaptopDetailDTO findDetailById(int id);

    LaptopSpecDTO findSpecById(int id);

    byte[] findImageById(Integer id, ImageType type);
}
