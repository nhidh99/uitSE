package org.example.service.api;

import org.example.input.ImageInput;
import org.example.type.ImageType;

public interface ImageService {
    byte[] findLaptopImage(ImageInput imageInput, ImageType type);
}
