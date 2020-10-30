package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.*;
import org.example.dto.comment.QuestionDTO;
import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.laptop.LaptopSpecDTO;
import org.example.dto.laptop.LaptopSummaryDTO;
import org.example.dto.promotion.PromotionDTO;
import org.example.dto.rating.RatingDTO;
import org.example.dto.spec.*;
import org.example.input.LaptopFilterInput;
import org.example.input.SearchInput;
import org.example.model.Question;
import org.example.model.Laptop;
import org.example.model.Promotion;
import org.example.model.Rating;
import org.example.service.api.LaptopService;
import org.example.type.ImageType;
import org.example.type.SearchOrderType;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

@Service
public class LaptopServiceImpl implements LaptopService {

    private static final int SIZE_PER_CLIENT_PAGE = 12;
    private static final int SIZE_PER_ADMIN_PAGE = 10;

    private final LaptopRepository laptopRepository;
    private final LaptopImageRepository laptopImageRepository;
    private final LaptopDetailImageRepository laptopDetailImageRepository;
    private final RatingRepository ratingRepository;
    private final CommentRepository commentRepository;
    private final PromotionRepository promotionRepository;
    private final TransactionTemplate txTemplate;

    @Autowired
    public LaptopServiceImpl(LaptopRepository laptopRepository,
                             LaptopImageRepository laptopImageRepository,
                             LaptopDetailImageRepository laptopDetailImageRepository,
                             RatingRepository ratingRepository,
                             CommentRepository commentRepository,
                             PromotionRepository promotionRepository,
                             PlatformTransactionManager txManager) {
        this.laptopRepository = laptopRepository;
        this.laptopImageRepository = laptopImageRepository;
        this.laptopDetailImageRepository = laptopDetailImageRepository;
        this.ratingRepository = ratingRepository;
        this.commentRepository = commentRepository;
        this.promotionRepository = promotionRepository;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public <T> Pair<List<T>, Long> findByPage(int page, Class<T> clazz) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_CLIENT_PAGE, Sort.by("id").descending());
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, clazz), laptopCount);
        });
    }

    @Override
    public Pair<List<LaptopOverviewDTO>, Long> findMostDiscountByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_CLIENT_PAGE, Sort.by("discountPrice").descending());
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class), laptopCount);
        });
    }

    @Override
    public Pair<List<LaptopOverviewDTO>, Long> findCheapestByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_CLIENT_PAGE, Sort.by("unitPrice"));
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findByRecordStatusTrue(pageable);
            long laptopCount = laptopRepository.countByRecordStatusTrue();
            return Pair.of(ModelMapperUtil.mapList(laptops, LaptopOverviewDTO.class), laptopCount);
        });
    }

    @Override
    public Pair<List<LaptopOverviewDTO>, Long> findBestSellingByPage(int page) {
        Pageable pageable = PageRequest.of(page - 1, SIZE_PER_CLIENT_PAGE);
        return txTemplate.execute((status) -> {
            List<Laptop> laptops = laptopRepository.findBestSelling(pageable);
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
    public LaptopDetailDTO findDetailById(int laptopId) {
        Pageable pageable = PageRequest.of(0, SIZE_PER_CLIENT_PAGE);
        return txTemplate.execute((status) -> {
            boolean isValidRequest = laptopRepository.existsByIdAndRecordStatusTrue(laptopId);
            if (!isValidRequest) throw new IllegalArgumentException(ErrorMessageConstants.LAPTOP_NOT_FOUND);

            Laptop laptop = laptopRepository.getOne(laptopId);
            List<Integer> suggestionIds = laptopRepository.findSuggestionIdsById(laptopId);
            List<Laptop> suggestionLaptops = laptopRepository.findByRecordStatusTrueAndIdIn(suggestionIds);
            List<Rating> ratings = ratingRepository.findByApproveStatusTrueAndLaptopId(laptopId, pageable);
            List<Question> questions = commentRepository.findByApproveStatusTrueAndLaptopId(laptopId, pageable);
            List<Promotion> promotions = promotionRepository.findByRecordStatusTrueAndLaptopsId(laptopId);
            List<Integer> imageIds = laptopDetailImageRepository.findIdsByLaptopId(laptopId);

            LaptopSpecDTO laptopSpecDTO = buildSpecDTOFromLaptop(laptop);
            List<RatingDTO> ratingDTOS = ModelMapperUtil.mapList(ratings, RatingDTO.class);
            List<QuestionDTO> questionDTOS = ModelMapperUtil.mapList(questions, QuestionDTO.class);
            List<PromotionDTO> promotionDTOS = ModelMapperUtil.mapList(promotions, PromotionDTO.class);
            List<LaptopOverviewDTO> suggestionDTOs = ModelMapperUtil.mapList(suggestionLaptops, LaptopOverviewDTO.class);

            return LaptopDetailDTO.builder().spec(laptopSpecDTO).ratings(ratingDTOS)
                    .comments(questionDTOS).promotions(promotionDTOS)
                    .suggestions(suggestionDTOs).imageIds(imageIds).build();
        });
    }

    @Override
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
                return null;
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
            Pageable pageable = buildPageableFromSearch(search);
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

    private Pageable buildPageableFromSearch(SearchInput search) {
        Sort sort = Sort.by(search.getTarget().toString());
        if (search.getOrder().equals(SearchOrderType.DESC)) {
            sort = sort.descending();
        }
        return PageRequest.of(search.getPage() - 1, SIZE_PER_ADMIN_PAGE, sort);
    }
}