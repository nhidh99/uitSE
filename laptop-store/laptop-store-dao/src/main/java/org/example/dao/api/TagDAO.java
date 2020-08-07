package org.example.dao.api;

import org.example.type.LaptopTagType;


import java.util.List;

public interface TagDAO {
    List<LaptopTagType> findByLaptopId(Integer laptopId);
}
