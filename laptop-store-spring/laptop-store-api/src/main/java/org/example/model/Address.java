package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.Formula;

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

    @Column(name = "ward_id")
    @JsonProperty("ward")
    private Integer wardId;

    @Column(name = "district_id")
    @JsonProperty("district")
    private Integer districtId;

    @Column(name = "city_id")
    @JsonProperty("city_id")
    private Integer cityId;

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

    @Formula("(SELECT c.name FROM City c WHERE c.id = city_id)")
    @Basic(fetch = FetchType.LAZY)
    private String cityName;

    @Formula("(SELECT d.name FROM District d WHERE d.id = district_id)")
    @Basic(fetch = FetchType.LAZY)
    private String districtName;

    @Formula("(SELECT w.name FROM Ward w WHERE w.id = ward_id)")
    @Basic(fetch = FetchType.LAZY)
    private String wardName;
}