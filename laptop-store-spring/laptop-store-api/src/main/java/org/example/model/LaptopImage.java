package org.example.model;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Table(name = "laptop")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LaptopImage {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "large_image")
    @ToString.Exclude
    private byte[] largeImage;

    @Lob
    @Column(name = "image")
    @Basic(fetch = FetchType.LAZY)
    @ToString.Exclude
    private byte[] image;

    @Lob
    @Column(name = "thumbnail")
    @Basic(fetch = FetchType.LAZY)
    @ToString.Exclude
    private byte[] thumbnail;
}
