package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Table(name = "address")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "address_num")
    @JsonProperty("address_num")
    private String addressNum;

    @Column(name = "street")
    @JsonProperty("street")
    private String street;

    @Column(name = "ward")
    @JsonProperty("ward")
    private String ward;

    @Column(name = "district")
    @JsonProperty("district")
    private String district;

    @Column(name = "city")
    @JsonProperty("city")
    private String city;

    @Column(name = "receiver_name")
    @JsonProperty("receiver_name")
    private String receiverName;

    @Column(name = "receiver_phone")
    @JsonProperty("receiver_phone")
    private String receiverPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Column(name = "record_status")
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    private boolean recordStatus;
}