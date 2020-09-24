package org.example.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.BatteryType;

import javax.persistence.*;

@Data
@Entity
@Table(name = "battery")
@NoArgsConstructor
@AllArgsConstructor
public class Battery {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;

    @Column(name = "type")
    @JsonProperty("type")
    @Enumerated(EnumType.STRING)
    private BatteryType type;

    @Column(name = "detail")
    @JsonProperty("detail")
    private String detail;

    @Column(name = "adapter")
    @JsonProperty("adapter")
    private String adapter;

    @OneToOne(mappedBy = "battery", fetch = FetchType.LAZY)
    private Laptop laptop;
}
