package org.example.rest;

import org.example.input.ImageInput;
import org.example.service.api.LaptopService;
import org.example.type.ImageType;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private LaptopService laptopService;

    private static final int LAPTOP_LARGE_IMAGE_RESOLUTION = 1000;
    private static final int LAPTOP_IMAGE_RESOLUTION = 400;
    private static final int LAPTOP_THUMBNAIL_RESOLUTION = 150;

    private static final Map<Integer, ImageType> laptopResolutionMap = new HashMap<Integer, ImageType>() {{
        put(LAPTOP_LARGE_IMAGE_RESOLUTION, ImageType.LAPTOP_LARGE_IMAGE);
        put(LAPTOP_IMAGE_RESOLUTION, ImageType.LAPTOP_IMAGE);
        put(LAPTOP_THUMBNAIL_RESOLUTION, ImageType.LAPTOP_THUMBNAIL);
    }};


    @GetMapping(value = "/laptops/{id}/{alt}.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getLaptopImage(ImageInput imageInput) {
        ImageType type = laptopResolutionMap.get(imageInput.getResolution());
        byte[] image = laptopService.findLaptopImage(imageInput.getId(), type);
        return ResponseEntity.ok(image);
    }
}
