package org.example.rest;

import org.example.constant.ResolutionConstants;
import org.example.input.ImageInput;
import org.example.service.api.LaptopImageService;
import org.example.service.api.LaptopService;
import org.example.service.api.PromotionService;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/images/{resolution}")
@PreAuthorize("permitAll()")
public class ImageRestService {

    private static final Map<Integer, ImageType> laptopResolutionMap = new HashMap<Integer, ImageType>() {{
        put(ResolutionConstants.LAPTOP_LARGE_IMAGE_RESOLUTION, ImageType.LAPTOP_LARGE_IMAGE);
        put(ResolutionConstants.LAPTOP_IMAGE_RESOLUTION, ImageType.LAPTOP_IMAGE);
        put(ResolutionConstants.LAPTOP_THUMBNAIL_RESOLUTION, ImageType.LAPTOP_THUMBNAIL);
    }};

    @Autowired
    private LaptopService laptopService;

    @Autowired
    private LaptopImageService laptopImageService;

    @Autowired
    private PromotionService promotionService;

    @GetMapping(value = "/laptops/{id}/{alt}.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getLaptopImage(ImageInput imageInput) {
        ImageType type = laptopResolutionMap.get(imageInput.getResolution());
        byte[] image = laptopService.findImageById(imageInput.getId(), type);
        return image == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(image);
    }

    @GetMapping(value = "/details/{id}/{alt}.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getLaptopDetailImage(ImageInput imageInput) {
        ImageType type = laptopResolutionMap.get(imageInput.getResolution());
        byte[] image = laptopImageService.findImageById(imageInput.getId(), type);
        return image == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(image);
    }

    @GetMapping(value = "/promotions/{id}/{alt}.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getPromotionImage(ImageInput imageInput) {
        byte[] image = imageInput.getResolution() == ResolutionConstants.PROMOTION_IMAGE_RESOLUTION
                ? promotionService.findImageById(imageInput.getId()) : null;
        return (image == null) ? ResponseEntity.notFound().build() : ResponseEntity.ok(image);
    }
}