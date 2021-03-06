package org.example.input.form;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AddressInput {
    @JsonProperty("id")
    private Integer addressId;

    @JsonProperty("receiver_name")
    private String receiverName;

    @JsonProperty("receiver_phone")
    private String receiverPhone;

    @JsonProperty("city_id")
    private Integer cityId;

    @JsonProperty("district_id")
    private Integer districtId;

    @JsonProperty("ward_id")
    private Integer wardId;

    @JsonProperty("street")
    private String street;

    @JsonProperty("address_num")
    private String addressNum;

    @JsonIgnore()
    private String username;
}
