package org.example.rest;

import org.example.model.Laptop;
import org.example.service.api.LaptopService;
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
@RequestMapping("/api/laptops")
@PreAuthorize("permitAll()")
public class LaptopRestService {
    @Autowired
    private LaptopService laptopService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getByPage(@RequestParam(defaultValue = "1") int page) {
        List<Laptop> laptops = laptopService.findByPage(page);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/discount", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getMostDiscountByPage(@RequestParam(defaultValue = "1") int page) {
        List<Laptop> laptops = laptopService.findMostDiscountByPage(page);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/cheap", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getCheapestByPage(@RequestParam(defaultValue = "1") int page) {
        List<Laptop> laptops = laptopService.findCheapestByPage(page);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/best-selling", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getBestSellingByPage(@RequestParam(defaultValue = "1") int page) {
        List<Laptop> laptops = laptopService.findBestSellingByPage(page);
        return ResponseEntity.ok(laptops);
    }
}