package org.example.rest;

import org.example.constant.ImageConstants;
import org.example.input.query.ImageInput;
import org.example.service.api.LaptopImageService;
import org.example.service.api.PromotionService;
import org.example.type.ImageResolutionType;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/images/{resolution}")
@PreAuthorize("permitAll()")
public class ImageRestService {

    private static final CacheControl cacheControl =
            CacheControl.maxAge(365, TimeUnit.DAYS).cachePublic()
            .mustRevalidate().proxyRevalidate();

    private static final Map<Integer, ImageResolutionType> laptopResolutionMap = new HashMap<>() {{
        put(ImageConstants.LAPTOP_LARGE_IMAGE_RESOLUTION, ImageResolutionType.LAPTOP_LARGE_IMAGE);
        put(ImageConstants.LAPTOP_IMAGE_RESOLUTION, ImageResolutionType.LAPTOP_IMAGE);
        put(ImageConstants.LAPTOP_THUMBNAIL_RESOLUTION, ImageResolutionType.LAPTOP_THUMBNAIL);
    }};

    private final LaptopImageService laptopImageService;
    private final PromotionService promotionService;

    @Autowired
    public ImageRestService(LaptopImageService laptopImageService,
                            PromotionService promotionService) {
        this.laptopImageService = laptopImageService;
        this.promotionService = promotionService;
    }

    @GetMapping(value = "/laptops/{id}/{alt}.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getLaptopMainImage(ImageInput imageInput) {
        ImageType imageType = ImageType.LAPTOP_MAIN_IMAGE;
        ImageResolutionType resolutionType = laptopResolutionMap.get(imageInput.getResolution());
        byte[] image = laptopImageService.findImageById(imageInput.getId(), resolutionType, imageType);
        return ResponseEntity.status(HttpStatus.OK).cacheControl(cacheControl).body(image);
    }

    @GetMapping(value = "/details/{id}/{alt}.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getLaptopDetailImage(ImageInput imageInput) {
        ImageType imageType = ImageType.LAPTOP_DETAIL_IMAGE;
        ImageResolutionType type = laptopResolutionMap.get(imageInput.getResolution());
        byte[] image = laptopImageService.findImageById(imageInput.getId(), type, imageType);
        return ResponseEntity.status(HttpStatus.OK).cacheControl(cacheControl).body(image);
    }

    @GetMapping(value = "/promotions/{id}/{alt}.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getPromotionImage(ImageInput imageInput) {
        byte[] image = imageInput.getResolution() == ImageConstants.PROMOTION_IMAGE_RESOLUTION
                ? promotionService.findPromotionImageById(imageInput.getId()) : null;
        return ResponseEntity.status(HttpStatus.OK).cacheControl(cacheControl).body(image);
    }
}