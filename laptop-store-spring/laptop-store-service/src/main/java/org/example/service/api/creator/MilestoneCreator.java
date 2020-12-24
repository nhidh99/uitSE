package org.example.service.api.creator;

import org.example.dto.milestone.MilestoneDTO;

import java.util.List;

public interface MilestoneCreator {
    List<MilestoneDTO> createUserMilestones(String username);
}
