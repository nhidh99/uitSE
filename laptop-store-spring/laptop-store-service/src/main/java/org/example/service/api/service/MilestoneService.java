package org.example.service.api.service;

import org.example.dto.milestone.MilestoneDTO;

import java.util.List;

public interface MilestoneService {
    List<MilestoneDTO> findUserMilestones(String username);
}
