package org.example.service.impl;

import org.example.constant.CacheConstants;
import org.example.constant.ErrorMessageConstants;
import org.example.constant.PaginateConstants;
import org.example.dao.*;
import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.laptop.LaptopSpecDTO;
import org.example.dto.laptop.LaptopSummaryDTO;
import org.example.dto.promotion.PromotionDTO;
import org.example.dto.spec.*;
import org.example.input.LaptopFilterInput;
import org.example.input.SearchInput;
import org.example.model.Laptop;
import org.example.model.Promotion;
import org.example.service.api.LaptopService;
import org.example.service.util.PageableUtil;
import org.example.type.ImageType;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class LaptopServiceImpl implements LaptopService {

    private final LaptopRepository laptopRepository;
    private final LaptopImageRepository laptopImageRepository;
    private final LaptopDetailImageRepository laptopDetailImageRepository;
    private final PromotionRepository promotionRepository;
    private final RatingRepository ratingRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public LaptopServiceImpl(LaptopRepository laptopRepository,
                             LaptopImageRepository laptopImageRepository,
                             LaptopDetailImageRepository laptopDetailImageRepository,
                             PromotionRepository promotionRepository,
                             RatingRepository ratingRepository,
                             PlatformTransactionManager txManager) {
        this.laptopRepository = laptopRepository;
        this.laptopImageRepository = laptopImageRepository;
        this.laptopDetailImageRepository = laptopDetailImageRepository;
        this.promotionRepository = promotionRepository;
        this.ratingRepository = ratingRepository;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    @Cacheable(
            value = CacheConstants.LAPTOPS,
            key = "'latest:page:'+ #page + ':class:' + #clazz.getSimpleName()"
    )
    public <T> Pair<List<T>, Long> findByPage(int page, Class<T> clazz) {
        Pageable pageable = PageRequest.of(page - 1, PaginateConstants.LAPTOP_PER_USER_PAGE, Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, clazz), laptopCount);
        });
    }

    @Override
    @Cacheable(
            value = CacheConstants.LAPTOPS,
            key = "'most-discount:page:' +#page"
    )
    public Pair<List<LaptopOverviewDTO>, Long> findMostDiscountByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1,
                PaginateConstants.LAPTOP_PER_USER_PAGE,
                Sort.by("discountPrice").descending());
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class), laptopCount);
        });
    }

    @Override
    @Cacheable(
            value = CacheConstants.LAPTOPS,
            key = "'cheapest:page:'+ #page"
    )
    public Pair<List<LaptopOverviewDTO>, Long> findCheapestByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, PaginateConstants.LAPTOP_PER_USER_PAGE, Sort.by("unitPrice"));
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class), laptopCount);
        });
    }

    @Override
    @Cacheable(
            value = CacheConstants.LAPTOPS,
            key = "'best-selling:page:'+ #page"
    )
    public Pair<List<LaptopOverviewDTO>, Long> findBestSellingByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, PaginateConstants.LAPTOP_PER_USER_PAGE, Sort.by("soldQuantity").descending());
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class), laptopCount);
        });
    }

    @Override
    public List<LaptopOverviewDTO> findByIds(List<Integer> ids) {
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(ids);
            return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
        });
    }

    @Override
    @Cacheable(value = CacheConstants.LAPTOP_DETAIL, key = "#laptopId")
    public LaptopDetailDTO findDetailById(int laptopId) {
        return txTemplate.execute((status) -> {
            boolean isValidRequest = laptopRepository.existsByIdAndRecordStatusTrue(laptopId);
            if (!isValidRequest) throw new IllegalArgumentException(ErrorMessageConstants.LAPTOP_NOT_FOUND);

            Laptop laptop = laptopRepository.getOne(laptopId);
            List<Integer> suggestionIds = laptopRepository.findSuggestionIdsById(laptopId);
            List<Laptop> suggestionLaptops = laptopRepository.findByRecordStatusTrueAndIdIn(suggestionIds);
            List<Promotion> promotions = promotionRepository.findByRecordStatusTrueAndLaptopsId(laptopId);
            List<Integer> imageIds = laptopDetailImageRepository.findIdsByLaptopId(laptopId);
            int[] ratingInfo = ratingRepository.findRatingPointCountsByLaptopId(laptopId);

            LaptopSpecDTO laptopSpecDTO = buildSpecDTOFromLaptop(laptop);
            List<PromotionDTO> promotionDTOS = ModelMapperUtil.mapList(promotions, PromotionDTO.class);
            List<LaptopOverviewDTO> suggestionDTOs = ModelMapperUtil.mapList(suggestionLaptops, LaptopOverviewDTO.class);

            return LaptopDetailDTO.builder().spec(laptopSpecDTO)
                    .promotions(promotionDTOS).suggestions(suggestionDTOs)
                    .imageIds(imageIds).ratingInfo(ratingInfo).build();
        });
    }

    @Override
    @Cacheable(value = CacheConstants.LAPTOP_SPEC, key = "#laptopId")
    public LaptopSpecDTO findSpecById(int laptopId) {
        return txTemplate.execute((status) -> {
            boolean isValidRequest = laptopRepository.existsByIdAndRecordStatusTrue(laptopId);
            if (!isValidRequest) throw new IllegalArgumentException(ErrorMessageConstants.LAPTOP_NOT_FOUND);
            Laptop laptop = laptopRepository.getOne(laptopId);
            return buildSpecDTOFromLaptop(laptop);
        });
    }

    private LaptopSpecDTO buildSpecDTOFromLaptop(Laptop laptop) {
        BatteryDTO batteryDTO = ModelMapperUtil.map(laptop.getBattery(), BatteryDTO.class);
        CpuDTO cpuDTO = ModelMapperUtil.map(laptop.getCpu(), CpuDTO.class);
        HardDriveDTO hardDriveDTO = ModelMapperUtil.map(laptop.getHardDrive(), HardDriveDTO.class);
        MonitorDTO monitorDTO = ModelMapperUtil.map(laptop.getMonitor(), MonitorDTO.class);
        RamDTO ramDTO = ModelMapperUtil.map(laptop.getRam(), RamDTO.class);

        LaptopSpecDTO output = LaptopSpecDTO.builder()
                .batteryDTO(batteryDTO).cpuDTO(cpuDTO).hardDriveDTO(hardDriveDTO)
                .monitorDTO(monitorDTO).ramDTO(ramDTO).build();
        ModelMapperUtil.map(laptop, output);
        return output;
    }

    @Override
    public byte[] findImageById(Integer id, ImageType type) {
        switch (type) {
            case LAPTOP_LARGE_IMAGE:
                return laptopImageRepository.findLargeImageById(id);
            case LAPTOP_IMAGE:
                return laptopImageRepository.findImageById(id);
            case LAPTOP_THUMBNAIL:
                return laptopImageRepository.findThumbnailById(id);
            default:
                throw new NoSuchElementException();
        }
    }

    @Override
    public Pair<List<LaptopOverviewDTO>, Long> findByFilter(LaptopFilterInput filter) {
        return txTemplate.execute((status) -> {
            List<Laptop> laptops;
            long laptopCount;
            if (filter.getName() != null) {
                laptops = laptopRepository.findByName(filter);
                laptopCount = laptopRepository.countByNameContainingIgnoreCaseAndRecordStatusTrue(filter.getName());
            } else {
                laptops = laptopRepository.findByFilter(filter);
                laptopCount = laptopRepository.countByFilter(filter);
            }
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class), laptopCount);
        });
    }

    @Override
    public Pair<List<LaptopSummaryDTO>, Long> findBySearch(SearchInput search) {
        return txTemplate.execute((status) -> {
            List<Laptop> laptops;
            long laptopCount;
            Pageable pageable = PageableUtil.buildPageableFromSearch(search);
            String query = search.getQuery().trim();

            if (query.isEmpty()) {
                laptops = laptopRepository.findByRecordStatusTrue(pageable);
                laptopCount = laptopRepository.countByRecordStatusTrue();
            } else {
                laptops = laptopRepository.findByRecordStatusTrueAndNameContainingOrIdEquals(query, pageable);
                laptopCount = laptopRepository.countByRecordStatusTrueAndNameContainingOrIdEquals(query);
            }
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopSummaryDTO.class), laptopCount);
        });
    }

    @Override
    @Cacheable(value = "laptop-specs", key = "'all'")
    public Pair<List<LaptopSpecDTO>, Long> findAllLaptopSpec() {
        return txTemplate.execute((status) -> {
            List<Laptop>  laptops = laptopRepository.findAll();
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            List<LaptopSpecDTO> specs = laptops.stream().map(this::buildSpecDTOFromLaptop).collect(Collectors.toList());
            return Pair.of(specs, laptopCount);
        });
    }
}