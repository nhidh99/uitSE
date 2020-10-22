package org.example.dto.address;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AddressDetailDTO {
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
}
