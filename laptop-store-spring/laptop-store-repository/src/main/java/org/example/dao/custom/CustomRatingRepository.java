package org.example.dao.custom;

public interface CustomRatingRepository {
    int[] findRatingPointCountsByLaptopId(Integer laptopId);
}
