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

@Service
public class LaptopServiceImpl implements LaptopService {

    private final LaptopRepository laptopRepository;
    private final LaptopDetailImageRepository laptopDetailImageRepository;
    private final PromotionRepository promotionRepository;
    private final RatingRepository ratingRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public LaptopServiceImpl(LaptopRepository laptopRepository,
                             LaptopDetailImageRepository laptopDetailImageRepository,
                             PromotionRepository promotionRepository,
                             RatingRepository ratingRepository,
                             PlatformTransactionManager txManager) {
        this.laptopRepository = laptopRepository;
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
    public <T> Pair<List<T>, Long> findAndCountLatestLaptopsByPage(int page, Class<T> clazz) {
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
    public Pair<List<LaptopOverviewDTO>, Long> findAndCountMostDiscountedLaptopOverviewsByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1,
                PaginateConstants.LAPTOP_PER_USER_PAGE,
                Sort.by("discountPrice").descending());
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long count = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class), count);
        });
    }

    @Override
    @Cacheable(
            value = CacheConstants.LAPTOPS,
            key = "'cheapest:page:'+ #page"
    )
    public Pair<List<LaptopOverviewDTO>, Long> findAndCountCheapestLaptopOverviewsByPage(int page) {
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
    public Pair<List<LaptopOverviewDTO>, Long> findAndCountBestSellingLaptopOverviewsByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, PaginateConstants.LAPTOP_PER_USER_PAGE, Sort.by("soldQuantity").descending());
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class), laptopCount);
        });
    }

    @Override
    public List<LaptopOverviewDTO> findLaptopOverviewsByIds(List<Integer> ids) {
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(ids);
            return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
        });
    }

    @Override
    @Cacheable(value = CacheConstants.LAPTOP_DETAIL, key = "#laptopId")
    public LaptopDetailDTO findLaptopDetailById(Integer laptopId) {
        return txTemplate.execute((status) -> {
            LaptopSpecDTO laptopSpecDTO = findLaptopSpecById(laptopId);
            List<Integer> imageIds = laptopDetailImageRepository.findIdsByLaptopId(laptopId);
            List<PromotionDTO> promotionDTOs = findLaptopPromotionDTOs(laptopId);
            List<LaptopOverviewDTO> suggestedLaptopDTOs = findLaptopSuggestionOverviews(laptopId);
            int[] ratingCounts = findLaptopRatingCounts(laptopId);
            return LaptopDetailDTO.builder().spec(laptopSpecDTO)
                    .promotions(promotionDTOs).suggestions(suggestedLaptopDTOs)
                    .imageIds(imageIds).ratingCounts(ratingCounts).build();
        });
    }

    private int[] findLaptopRatingCounts(Integer laptopId) {
        return ratingRepository.findRatingPointCountsByLaptopId(laptopId);
    }

    private List<PromotionDTO> findLaptopPromotionDTOs(Integer laptopId) {
        List<Promotion> promotions = promotionRepository.findByRecordStatusTrueAndLaptopsId(laptopId);
        return ModelMapperUtil.mapList(promotions, PromotionDTO.class);
    }

    private List<LaptopOverviewDTO> findLaptopSuggestionOverviews(Integer laptopId) {
        List<Integer> suggestedLaptopIds = laptopRepository.findSuggestionIdsById(laptopId);
        List<Laptop> suggestedLaptops = laptopRepository.findByRecordStatusTrueAndIdIn(suggestedLaptopIds);
        return ModelMapperUtil.mapList(suggestedLaptops, LaptopOverviewDTO.class);
    }

    @Override
    @Cacheable(value = CacheConstants.LAPTOP_SPEC, key = "#laptopId")
    public LaptopSpecDTO findLaptopSpecById(Integer laptopId) {
        return txTemplate.execute((status) -> {
            checkExistedLaptopId(laptopId);
            Laptop laptop = laptopRepository.getOne(laptopId);
            BatteryDTO batteryDTO = ModelMapperUtil.map(laptop.getBattery(), BatteryDTO.class);
            CpuDTO cpuDTO = ModelMapperUtil.map(laptop.getCpu(), CpuDTO.class);
            HardDriveDTO hardDriveDTO = ModelMapperUtil.map(laptop.getHardDrive(), HardDriveDTO.class);
            MonitorDTO monitorDTO = ModelMapperUtil.map(laptop.getMonitor(), MonitorDTO.class);
            RamDTO ramDTO = ModelMapperUtil.map(laptop.getRam(), RamDTO.class);
            LaptopSpecDTO output = LaptopSpecDTO.builder()
                    .batteryDTO(batteryDTO).cpuDTO(cpuDTO)
                    .hardDriveDTO(hardDriveDTO).monitorDTO(monitorDTO)
                    .ramDTO(ramDTO).build();
            return ModelMapperUtil.map(laptop, output);
        });
    }

    private void checkExistedLaptopId(Integer laptopId) {
        boolean isValidRequest = laptopRepository.existsByIdAndRecordStatusTrue(laptopId);
        if (!isValidRequest) throw new IllegalArgumentException(ErrorMessageConstants.LAPTOP_NOT_FOUND);
    }

    @Override
    public Pair<List<LaptopOverviewDTO>, Long> findAndCountLaptopOverviewsByFilter(LaptopFilterInput filter) {
        return txTemplate.execute((status) -> {
            Pair<List<Laptop>, Long> laptopsAndCount = filter.getName() != null
                    ? findAndCountLaptopByFilterWithNameParam(filter)
                    : findAndCountLaptopByFilterWithoutNameParam(filter);
            return ModelMapperUtil.mapPairOfListAndCount(laptopsAndCount, LaptopOverviewDTO.class);
        });
    }

    private Pair<List<Laptop>, Long> findAndCountLaptopByFilterWithNameParam(LaptopFilterInput filter) {
        List<Laptop> laptops = laptopRepository.findByName(filter);
        long count = laptopRepository.countByNameContainingIgnoreCaseAndRecordStatusTrue(filter.getName());
        return Pair.of(laptops, count);
    }

    private Pair<List<Laptop>, Long> findAndCountLaptopByFilterWithoutNameParam(LaptopFilterInput filter) {
        List<Laptop> laptops = laptopRepository.findAndCountLaptopOverviewsByFilter(filter);
        long count = laptopRepository.countByFilter(filter);
        return Pair.of(laptops, count);
    }

    @Override
    public Pair<List<LaptopSummaryDTO>, Long> findAndCountLaptopSummariesBySearch(SearchInput search) {
        return txTemplate.execute((status) -> {
            Pageable pageable = PageableUtil.createPageableFromSearch(search);
            boolean isBlankQuery = search.getQuery().isBlank();
            Pair<List<Laptop>, Long> laptopsAndCount = isBlankQuery
                    ? findAndCountLaptopBySearchWithoutQueryParam(pageable)
                    : findAndCountLaptopBySearchWithQueryParam(search, pageable);
            return ModelMapperUtil.mapPairOfListAndCount(laptopsAndCount, LaptopSummaryDTO.class);
        });
    }

    private Pair<List<Laptop>, Long> findAndCountLaptopBySearchWithoutQueryParam(Pageable pageable) {
        List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
        long count = laptopRepository.countByRecordStatusTrue();
        return Pair.of(laptops, count);
    }

    private Pair<List<Laptop>, Long> findAndCountLaptopBySearchWithQueryParam(SearchInput search, Pageable pageable) {
        String query = search.getQuery().trim();
        List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndNameContainingOrIdEquals(query, pageable);
        long count = laptopRepository.countByRecordStatusTrueAndNameContainingOrIdEquals(query);
        return Pair.of(laptops, count);
    }
}