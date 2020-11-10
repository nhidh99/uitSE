package org.example.rest;

import org.example.constant.ResolutionConstants;
import org.example.input.ImageInput;
import org.example.service.api.ImageService;
import org.example.service.api.LaptopService;
import org.example.service.api.PromotionService;
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

    private static final Map<Integer, ImageType> laptopResolutionMap = new HashMap<>() {{
        put(ResolutionConstants.LAPTOP_LARGE_IMAGE_RESOLUTION, ImageType.LAPTOP_LARGE_IMAGE);
        put(ResolutionConstants.LAPTOP_IMAGE_RESOLUTION, ImageType.LAPTOP_IMAGE);
        put(ResolutionConstants.LAPTOP_THUMBNAIL_RESOLUTION, ImageType.LAPTOP_THUMBNAIL);
    }};

    private final LaptopService laptopService;
    private final ImageService laptopImageService;
    private final PromotionService promotionService;

    @Autowired
    public ImageRestService(LaptopService laptopService, ImageService laptopImageService,
                            PromotionService promotionService) {
        this.laptopService = laptopService;
        this.laptopImageService = laptopImageService;
        this.promotionService = promotionService;
    }

    @GetMapping(value = "/laptops/{id}/{alt}.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getLaptopImage(ImageInput imageInput) {
        ImageType type = laptopResolutionMap.get(imageInput.getResolution());
        byte[] image = laptopService.findImageById(imageInput.getId(), type);
        return ResponseEntity.status(HttpStatus.OK).cacheControl(cacheControl).body(image);
    }

    @GetMapping(value = "/details/{id}/{alt}.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getLaptopDetailImage(ImageInput imageInput) {
        ImageType type = laptopResolutionMap.get(imageInput.getResolution());
        byte[] image = laptopImageService.findImageById(imageInput.getId(), type);
        return ResponseEntity.status(HttpStatus.OK).cacheControl(cacheControl).body(image);
    }

    @GetMapping(value = "/promotions/{id}/{alt}.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getPromotionImage(ImageInput imageInput) {
        byte[] image = imageInput.getResolution() == ResolutionConstants.PROMOTION_IMAGE_RESOLUTION
                ? promotionService.findImageById(imageInput.getId()) : null;
        return ResponseEntity.status(HttpStatus.OK).cacheControl(cacheControl).body(image);
    }
}