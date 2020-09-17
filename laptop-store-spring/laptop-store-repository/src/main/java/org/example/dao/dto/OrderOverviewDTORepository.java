package org.example.dao.dto;

import org.example.dto.OrderOverviewDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderOverviewDTORepository extends JpaRepository<OrderOverviewDTO, Integer>  {
    List<OrderOverviewDTO> findByUserUsername(String username, Pageable pageable);
}