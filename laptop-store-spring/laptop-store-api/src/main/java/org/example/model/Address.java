package org.example.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "address_num")
    private String addressNum;

    @Column(name = "street")
    private String street;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private Ward ward;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @Column(name = "receiver_name")
    private String receiverName;

    @Column(name = "receiver_phone")
    private String receiverPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "record_status")
    @Basic(fetch = FetchType.LAZY)
    private boolean recordStatus;

    public Integer getCityId() {
        return city.getId();
    }

    public Integer getDistrictId() {
        return district.getId();
    }

    public Integer getWardId() {
        return ward.getId();
    }

    public String getCityName() {
        return city.getName();
    }

    public String getDistrictName() {
        return district.getName();
    }

    public String getWardName() {
        return ward.getName();
    }

    public String getLocation() {
        return addressNum.concat(" ")
                .concat(String.join(", ",
                        street, ward.getName(),
                        district.getName(),
                        city.getName()));
    }

    public boolean isUserDefaultAddress(User user) {
        return this.id.equals(user.getDefaultAddressId());
    }
}