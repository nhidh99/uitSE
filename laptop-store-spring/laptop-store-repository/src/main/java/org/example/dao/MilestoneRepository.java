package org.example.dao;

import org.example.model.Milestone;
import org.example.type.MilestoneType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneRepository extends JpaRepository<Milestone, MilestoneType> {
}
