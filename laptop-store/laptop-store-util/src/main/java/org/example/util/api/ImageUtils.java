package org.example.util.api;

import org.example.type.ImageType;

import java.awt.image.BufferedImage;
import java.io.IOException;

public interface ImageUtils {
    byte[] buildBinaryImage(BufferedImage image, ImageType type) throws IOException;
    String buildSEOImageName(String name);
}
