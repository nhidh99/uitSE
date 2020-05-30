package org.example.dao.api;

import org.example.model.Tag;


import java.util.List;
import java.util.Optional;

public interface TagDAO {
    List<Tag> findAll();

    List<Tag> findByIds(List<Integer> ids);

    List<Tag> findByLaptopId(Integer laptopId);

    Optional<Tag> findById(Integer id);
}
