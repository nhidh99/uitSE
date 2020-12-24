package org.example.service.impl.creator;

import org.example.dao.LaptopDetailImageRepository;
import org.example.dao.LaptopRepository;
import org.example.dao.PromotionRepository;
import org.example.dao.RatingRepository;
import org.example.dto.laptop.LaptopDetailDTO;
import org.example.dto.laptop.LaptopOverviewDTO;
import org.example.dto.laptop.LaptopSpecDTO;
import org.example.dto.promotion.PromotionDTO;
import org.example.dto.spec.*;
import org.example.model.Laptop;
import org.example.model.Promotion;
import org.example.service.api.creator.LaptopCreator;
import org.example.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LaptopCreatorImpl implements LaptopCreator {
    private final LaptopRepository laptopRepository;
    private final RatingRepository ratingRepository;
    private final PromotionRepository promotionRepository;
    private final LaptopDetailImageRepository laptopDetailImageRepository;

    @Autowired
    public LaptopCreatorImpl(LaptopRepository laptopRepository, RatingRepository ratingRepository,
                             PromotionRepository promotionRepository, LaptopDetailImageRepository laptopDetailImageRepository) {
        this.laptopRepository = laptopRepository;
        this.ratingRepository = ratingRepository;
        this.promotionRepository = promotionRepository;
        this.laptopDetailImageRepository = laptopDetailImageRepository;
    }

    @Override
    public LaptopSpecDTO createLaptopSpec(Integer laptopId) {
        Laptop laptop = laptopRepository.getOne(laptopId);
        BatteryDTO batteryDTO = ModelMapperUtil.map(laptop.getBattery(), BatteryDTO.class);
        CpuDTO cpuDTO = ModelMapperUtil.map(laptop.getCpu(), CpuDTO.class);
        HardDriveDTO hardDriveDTO = ModelMapperUtil.map(laptop.getHardDrive(), HardDriveDTO.class);
        MonitorDTO monitorDTO = ModelMapperUtil.map(laptop.getMonitor(), MonitorDTO.class);
        RamDTO ramDTO = ModelMapperUtil.map(laptop.getRam(), RamDTO.class);
        LaptopSpecDTO output = LaptopSpecDTO.builder()
                .batteryDTO(batteryDTO).cpuDTO(cpuDTO).hardDriveDTO(hardDriveDTO)
                .monitorDTO(monitorDTO).ramDTO(ramDTO).build();
        return ModelMapperUtil.map(laptop, output);
    }

    @Override
    public LaptopDetailDTO createLaptopDetail(Integer laptopId) {
        LaptopSpecDTO laptopSpecDTO = createLaptopSpec(laptopId);
        List<Integer> imageIds = laptopDetailImageRepository.findIdsByLaptopId(laptopId);
        List<PromotionDTO> promotionDTOs = findLaptopPromotionDTOs(laptopId);
        List<LaptopOverviewDTO> suggestedLaptopDTOs = findLaptopSuggestionOverviews(laptopId);
        int[] ratingCounts = findLaptopRatingCounts(laptopId);
        return LaptopDetailDTO.builder().spec(laptopSpecDTO)
                .promotions(promotionDTOs).suggestions(suggestedLaptopDTOs)
                .imageIds(imageIds).ratingCounts(ratingCounts).build();
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
}
