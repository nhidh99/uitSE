package org.example.rest;

import org.example.input.AddressInput;
import org.example.model.Address;
import org.example.model.User;
import org.example.service.api.AddressService;
import org.example.service.api.LocationService;
import org.example.service.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/addresses")
@PreAuthorize("isAuthenticated()")
public class AddressRestService {
    @Autowired
    private AddressService addressService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getAddressById(@AuthenticationPrincipal UserDetails userDetails,
                                            @PathVariable("id") Integer id) {
        boolean isValidRequest = addressService.existsByIdAndUsername(id, userDetails.getUsername());
        if (!isValidRequest) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Address address = addressService.findById(id).get();
        Integer cityId = locationService.findCityByName(address.getCity()).getId();
        Integer districtId = locationService.findDistrictByNameAndCityId(address.getDistrict(), cityId).getId();
        Integer wardId = locationService.findWardByNameAndDistrictId(address.getWard(), districtId).getId();
        Map<?, ?> output = new HashMap<String, Object>() {{
            put("address", address);
            put("city_id", cityId);
            put("district_id", districtId);
            put("ward_id", wardId);
        }};
        return ResponseEntity.ok(output);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> postAddress(@AuthenticationPrincipal UserDetails userDetails,
                                         @RequestBody AddressInput addressInput) {
        try {
            Address address = buildAddressFromRequest(userDetails, addressInput);
            Integer addressId = addressService.save(address);
            return ResponseEntity.ok(addressId.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putAddress(@AuthenticationPrincipal UserDetails userDetails,
                                        @RequestBody AddressInput addressInput,
                                        @PathVariable("id") Integer addressId) {
        try {
            boolean isValidRequest = addressService.existsByIdAndUsername(addressId, userDetails.getUsername());
            if (!isValidRequest) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            Address address = buildAddressFromRequest(userDetails, addressInput);
            address.setId(addressId);
            addressService.save(address);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteAddress(@AuthenticationPrincipal UserDetails userDetails,
                                           @PathVariable("id") Integer addressId) {
        try {
            boolean isValidRequest = addressService.existsByIdAndUsername(addressId, userDetails.getUsername());
            if (!isValidRequest) {
                return ResponseEntity.notFound().build();
            }
            addressService.deleteById(addressId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/{id}/default", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putDefaultAddress(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable("id") Integer addressId) {
        try {
            String username = userDetails.getUsername();
            boolean isValidRequest = addressService.existsByIdAndUsername(addressId, username);
            if (!isValidRequest) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            User user = userService.findByUsername(username);
            user.setDefaultAddressId(addressId);
            userService.save(user);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private Address buildAddressFromRequest(UserDetails userDetails, AddressInput addressInput) {
        Integer cityId = addressInput.getCityId();
        Integer districtId = addressInput.getDistrictId();
        Integer wardId = addressInput.getWardId();

        boolean isValidLocation = locationService.validateLocation(cityId, districtId, wardId);
        if (!isValidLocation) {
            throw new IllegalArgumentException();
        }

        String cityName = locationService.findCityById(cityId).get().getName();
        String districtName = locationService.findDistrictById(districtId).get().getName();
        String wardName = locationService.findWardById(wardId).get().getName();
        User user = userService.findByUsername(userDetails.getUsername());

        return Address.builder()
                .city(cityName).district(districtName).ward(wardName)
                .receiverName(addressInput.getReceiverName())
                .receiverPhone(addressInput.getReceiverPhone())
                .street(addressInput.getStreet())
                .addressNum(addressInput.getAddressNum())
                .user(user).recordStatus(true).build();
    }
}