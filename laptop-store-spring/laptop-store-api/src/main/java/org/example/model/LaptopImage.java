package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "laptop_image")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LaptopImage {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "large_image")
    @JsonIgnore
    private byte[] largeImage;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "image")
    @JsonIgnore
    private byte[] image;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "thumbnail")
    @JsonIgnore
    private byte[] thumbnail;

    @ManyToOne
    @JoinColumn(name = "laptop_id")
    @JsonIgnore
    private Laptop laptop;
}