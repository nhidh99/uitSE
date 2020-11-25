package org.example.util;

import java.io.Serializable;

public class ImageUrlUtil implements Serializable {
    private static final String JPG_FORMAT = ".jpg";
    private static final String LAPTOP_PREFIX_IMAGE_URL = "/api/images/";

    public static String getLaptopImageUrl(int id, String slug, int resolution) {
        return new StringBuilder(LAPTOP_PREFIX_IMAGE_URL).append(resolution)
                .append("/laptops/").append(id).append("/").append(slug)
                .append(JPG_FORMAT).toString();
    }
}
