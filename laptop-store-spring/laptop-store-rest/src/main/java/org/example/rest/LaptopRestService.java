package org.example.rest;

import org.example.constant.HeaderConstants;
import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.laptop.LaptopSpecDTO;
import org.example.dto.laptop.LaptopSummaryDTO;
import org.example.input.query.LaptopFilterInput;
import org.example.input.query.ProductSearchInput;
import org.example.service.api.service.LaptopService;
import org.example.type.*;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
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
        LaptopDetailDTO output = laptopService.findLaptopDetailById(id);
        return ResponseEntity.ok(output);
    }

    @GetMapping(value = "/{id}/spec", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getSpecById(@PathVariable("id") int id) {
        LaptopSpecDTO output = laptopService.findLaptopSpecById(id);
        return ResponseEntity.ok(output);
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, params = "ids")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getByIds(@RequestParam(value = "ids") List<Integer> ids) {
        List<LaptopOverviewDTO> laptops = laptopService.findLaptopsByIds(ids);
        return ResponseEntity.ok(laptops);
    }

    @GetMapping(value = "/latest", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getByPage(@RequestParam(defaultValue = "1") int page) {
        Pair<List<LaptopOverviewDTO>, Long> laptopsAndCount = laptopService.findAndCountLatestLaptopsByPage(page, LaptopOverviewDTO.class);
        return ResponseEntity.ok()
                .header(HeaderConstants.TOTAL_COUNT, laptopsAndCount.getSecond().toString())
                .body(laptopsAndCount.getFirst());
    }

    @GetMapping(value = "/discount", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getMostDiscountByPage(@RequestParam(defaultValue = "1") int page) {
        Pair<List<LaptopOverviewDTO>, Long> laptopsAndCount = laptopService.findAndCountMostDiscountedLaptopOverviewsByPage(page);
        return ResponseEntity.ok()
                .header(HeaderConstants.TOTAL_COUNT, laptopsAndCount.getSecond().toString())
                .body(laptopsAndCount.getFirst());
    }

    @GetMapping(value = "/cheap", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getCheapestByPage(@RequestParam(defaultValue = "1") int page) {
        Pair<List<LaptopOverviewDTO>, Long> laptopsAndCount = laptopService.findAndCountCheapestLaptopOverviewsByPage(page);
        return ResponseEntity.ok()
                .header(HeaderConstants.TOTAL_COUNT, laptopsAndCount.getSecond().toString())
                .body(laptopsAndCount.getFirst());
    }

    @GetMapping(value = "/best-selling", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getBestSellingByPage(@RequestParam(defaultValue = "1") int page) {
        Pair<List<LaptopOverviewDTO>, Long> laptopsAndCount = laptopService.findAndCountBestSellingLaptopOverviewsByPage(page);
        return ResponseEntity.ok()
                .header(HeaderConstants.TOTAL_COUNT, laptopsAndCount.getSecond().toString())
                .body(laptopsAndCount.getFirst());
    }

    @GetMapping(value = "/filter", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getLaptopsByFilter(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "brands", defaultValue = "", required = false) List<BrandType> brands,
            @RequestParam(value = "cpus", defaultValue = "", required = false) List<CPUType> cpus,
            @RequestParam(value = "rams", defaultValue = "", required = false) List<Integer> rams,
            @RequestParam(value = "tags", defaultValue = "", required = false) List<LaptopTagType> tags,
            @RequestParam(value = "price", required = false) Integer price,
            @RequestParam(value = "target", defaultValue = "BEST_SELLING") FilterTargetType target,
            @RequestParam(value = "page", defaultValue = "1") Integer page) {

        LaptopFilterInput filter = LaptopFilterInput.builder().name(name).brands(brands)
                .target(target).cpus(cpus).rams(rams).page(page).price(price).tags(tags).build();
        Pair<List<LaptopOverviewDTO>, Long> laptopsAndCount = laptopService.findAndCountLaptopsByFilter(filter);
        return ResponseEntity.ok()
                .header(HeaderConstants.TOTAL_COUNT, laptopsAndCount.getSecond().toString())
                .body(laptopsAndCount.getFirst());
    }

    @PreAuthorize("hasAuthority(T(org.example.type.RoleType).ADMIN)")
    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getLaptopsByPage(
            @RequestParam(value = "query", defaultValue = "") String query,
            @RequestParam(value = "target", defaultValue = "ID") SearchTargetType target,
            @RequestParam(value = "order", defaultValue = "DESC") SearchOrderType order,
            @RequestParam(value = "page", defaultValue = "1") Integer page) {

        ProductSearchInput search = ProductSearchInput.builder().query(query).target(target).order(order).page(page).build();
        Pair<List<LaptopSummaryDTO>, Long> laptopsAndCount = laptopService.findAndCountLaptopsBySearch(search);
        return ResponseEntity.ok()
                .header(HeaderConstants.TOTAL_COUNT, laptopsAndCount.getSecond().toString())
                .body(laptopsAndCount.getFirst());
    }
}