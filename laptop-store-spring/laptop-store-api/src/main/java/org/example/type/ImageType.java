package org.example.type;

import org.example.constant.RepositoryNameConstants;

import java.util.NoSuchElementException;

public enum ImageType {
    LAPTOP_MAIN_IMAGE,
    LAPTOP_DETAIL_IMAGE;

    public String getRepositoryName() {
        switch (this) {
            case LAPTOP_DETAIL_IMAGE:
                return RepositoryNameConstants.LAPTOP_DETAIL_IMAGE;
            case LAPTOP_MAIN_IMAGE:
                return RepositoryNameConstants.LAPTOP_MAIN_IMAGE;
            default:
                throw new NoSuchElementException();
        }
    }
}
