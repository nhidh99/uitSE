package org.example.rest;

import org.example.model.City;
import org.example.model.District;
import org.example.model.Ward;
import org.example.service.api.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@PreAuthorize("permitAll()")
@RequestMapping("/api/locations")
public class LocationRestService {
    @Autowired
    private LocationService locationService;

    @GetMapping(value = "/cities", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getAllCities() {
        List<City> cities = locationService.findCities();
        return ResponseEntity.ok(cities);
    }

    @GetMapping(value = "/districts", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getDistrictsByCityId(@RequestParam("city_id") Integer cityId) {
        List<District> districts = locationService.findDistrictsByCityId(cityId);
        return ResponseEntity.ok(districts);
    }

    @GetMapping(value = "/wards", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getWardsByDistrictId(@RequestParam("district_id") Integer districtId) {
        List<Ward> wards = locationService.findByWardsByDistrictId(districtId);
        return ResponseEntity.ok(wards);
    }
}
