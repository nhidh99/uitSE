package org.example.service.api;

import org.example.dto.milestone.MilestoneDTO;

import java.util.List;

public interface MilestoneService {
    List<MilestoneDTO> findByUsername(String username);
}
