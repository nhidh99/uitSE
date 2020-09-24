package org.example.rest;

import org.example.constant.ErrorMessageConstants;
import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.service.api.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/laptops")
@PreAuthorize("permitAll()")
public class LaptopRestService {

    private final LaptopService laptopService;

    @Autowired
    public LaptopRestService(LaptopService laptopService) {
        this.laptopService = laptopService;
    }

    @GetMapping(value = "/{id}/details", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getDetailsById(@PathVariable("id") int id) {
        try {
            LaptopDetailDTO output = laptopService.findDetailById(id);
            return ResponseEntity.ok(output);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessageConstants.SERVER_ERROR);
        }
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, params = "ids")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getByIds(@RequestParam(value = "ids") List<Integer> ids) {
        List<LaptopOverviewDTO> laptops = laptopService.findByIds(ids);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/latest", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getByPage(@RequestParam(defaultValue = "1") int page) {
        List<LaptopOverviewDTO> laptops = laptopService.findByPage(page);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/discount", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getMostDiscountByPage(@RequestParam(defaultValue = "1") int page) {
        List<LaptopOverviewDTO> laptops = laptopService.findMostDiscountByPage(page);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/cheap", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getCheapestByPage(@RequestParam(defaultValue = "1") int page) {
        List<LaptopOverviewDTO> laptops = laptopService.findCheapestByPage(page);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/best-selling", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getBestSellingByPage(@RequestParam(defaultValue = "1") int page) {
        List<LaptopOverviewDTO> laptops = laptopService.findBestSellingByPage(page);
        return ResponseEntity.ok(laptops);
    }
}