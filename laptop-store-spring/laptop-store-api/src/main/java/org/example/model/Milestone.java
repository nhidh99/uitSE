package org.example.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.MilestoneType;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "milestone")
public class Milestone {
    @Id
    @Column(name = "id")
    @Enumerated(EnumType.STRING)
    private MilestoneType id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "bronze_value")
    private Long bronzeValue;

    @Column(name = "silver_value")
    private Long silverValue;

    @Column(name = "gold_value")
    private Long goldValue;
}
