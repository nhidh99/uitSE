package org.example.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.RAMType;
import org.hibernate.annotations.LazyToOne;
import org.hibernate.annotations.LazyToOneOption;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "ram")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RAM {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="size")
    @JsonProperty("size")
    private Integer size;

    @Column(name = "type")
    @JsonProperty("type")
    @Enumerated(EnumType.STRING)
    private RAMType type;

    @Column(name="bus")
    @JsonProperty("bus")
    private Integer bus;

    @Column(name="max_size")
    @JsonProperty("max_size")
    private Integer maxSize;

    @Column(name = "detail")
    @JsonProperty("detail")
    private String detail;

    @OneToOne(mappedBy = "ram", fetch = FetchType.LAZY)
    @LazyToOne(LazyToOneOption.NO_PROXY)
    private Laptop laptop;
}
