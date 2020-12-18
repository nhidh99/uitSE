package org.example.dao.custom;

public interface CustomLaptopImageRepostiory {
    byte[] findLargeImageById(Integer id);
    byte[] findImageById(Integer id);
    byte[] findThumbnailById(Integer id);
}