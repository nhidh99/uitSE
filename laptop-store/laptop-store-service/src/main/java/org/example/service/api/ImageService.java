package org.example.service.api;

import org.example.input.ImageInput;

import javax.ws.rs.core.Response;

public interface ImageService {
    Response findPromotionImage(ImageInput imageInput);

    Response findLaptopImage(ImageInput imageInput);

    Response findLaptopDetailImage(ImageInput imageInput);
}
