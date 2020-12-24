package org.example.service.impl.service;

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
import org.example.input.query.LaptopFilterInput;
import org.example.input.query.ProductSearchInput;
import org.example.model.Laptop;
import org.example.model.Promotion;
import org.example.service.api.checker.LaptopChecker;
import org.example.service.api.creator.LaptopCreator;
import org.example.service.api.service.LaptopService;
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
    private final LaptopChecker laptopChecker;
    private final LaptopCreator laptopCreator;
    private final TransactionTemplate txTemplate;

    @Autowired
    public LaptopServiceImpl(LaptopRepository laptopRepository, LaptopChecker laptopChecker,
                             LaptopCreator laptopCreator, PlatformTransactionManager txManager) {
        this.laptopRepository = laptopRepository;
        this.laptopChecker = laptopChecker;
        this.laptopCreator = laptopCreator;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    @Cacheable(value = CacheConstants.LAPTOPS, key = "'latest:page:'+ #page + ':class:' + #clazz.getSimpleName()")
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
    @Cacheable(value = CacheConstants.LAPTOPS, key = "'cheapest:page:'+ #page")
    public Pair<List<LaptopOverviewDTO>, Long> findAndCountCheapestLaptopOverviewsByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, PaginateConstants.LAPTOP_PER_USER_PAGE, Sort.by("unitPrice"));
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class), laptopCount);
        });
    }

    @Override
    @Cacheable(value = CacheConstants.LAPTOPS, key = "'best-selling:page:'+ #page")
    public Pair<List<LaptopOverviewDTO>, Long> findAndCountBestSellingLaptopOverviewsByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, PaginateConstants.LAPTOP_PER_USER_PAGE, Sort.by("soldQuantity").descending());
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class), laptopCount);
        });
    }

    @Override
    public List<LaptopOverviewDTO> findLaptopsByIds(List<Integer> ids) {
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndIdIn(ids);
            return ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class);
        });
    }

    @Override
    @Cacheable(value = CacheConstants.LAPTOP_DETAIL, key = "#laptopId")
    public LaptopDetailDTO findLaptopDetailById(Integer laptopId) {
        return txTemplate.execute((status) -> {
            laptopChecker.checkExistedLaptop(laptopId);
            return laptopCreator.createLaptopDetail(laptopId);
        });
    }

    @Override
    @Cacheable(value = CacheConstants.LAPTOP_SPEC, key = "#laptopId")
    public LaptopSpecDTO findLaptopSpecById(Integer laptopId) {
        return txTemplate.execute((status) -> {
            laptopChecker.checkExistedLaptop(laptopId);
            return laptopCreator.createLaptopSpec(laptopId);
        });
    }

    @Override
    public Pair<List<LaptopOverviewDTO>, Long> findAndCountLaptopsByFilter(LaptopFilterInput filter) {
        return txTemplate.execute((status) -> {
            Pair<List<Laptop>, Long> laptopsAndCount = filter.getName() != null
                    ? findAndCountLaptopsByFilterWithNameParam(filter)
                    : findAndCountLaptopsByFilterWithoutNameParam(filter);
            return ModelMapperUtil.mapFirstOfPair(laptopsAndCount, LaptopOverviewDTO.class);
        });
    }

    private Pair<List<Laptop>, Long> findAndCountLaptopsByFilterWithNameParam(LaptopFilterInput filter) {
        List<Laptop> laptops = laptopRepository.findByName(filter);
        long count = laptopRepository.countByNameContainingIgnoreCaseAndRecordStatusTrue(filter.getName());
        return Pair.of(laptops, count);
    }

    private Pair<List<Laptop>, Long> findAndCountLaptopsByFilterWithoutNameParam(LaptopFilterInput filter) {
        List<Laptop> laptops = laptopRepository.findAndCountLaptopsByFilter(filter);
        long count = laptopRepository.countByFilter(filter);
        return Pair.of(laptops, count);
    }

    @Override
    public Pair<List<LaptopSummaryDTO>, Long> findAndCountLaptopsBySearch(ProductSearchInput search) {
        return txTemplate.execute((status) -> {
            Pageable pageable = PageableUtil.createPageableFromSearch(search);
            boolean isBlankQuery = search.getQuery().isBlank();
            Pair<List<Laptop>, Long> laptopsAndCount = isBlankQuery
                    ? findAndCountLaptopsBySearchWithoutQueryParam(pageable)
                    : findAndCountLaptopsBySearchWithQueryParam(search, pageable);
            return ModelMapperUtil.mapFirstOfPair(laptopsAndCount, LaptopSummaryDTO.class);
        });
    }

    private Pair<List<Laptop>, Long> findAndCountLaptopsBySearchWithoutQueryParam(Pageable pageable) {
        List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
        long count = laptopRepository.countByRecordStatusTrue();
        return Pair.of(laptops, count);
    }

    private Pair<List<Laptop>, Long> findAndCountLaptopsBySearchWithQueryParam(ProductSearchInput search, Pageable pageable) {
        String query = search.getQuery().trim();
        List<Laptop> laptops = laptopRepository.findByRecordStatusTrueAndNameContainingOrIdEquals(query, pageable);
        long count = laptopRepository.countByRecordStatusTrueAndNameContainingOrIdEquals(query);
        return Pair.of(laptops, count);
    }
}