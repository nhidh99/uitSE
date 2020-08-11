package org.example.type;

public enum BrandType {
    ACER,
    ASUS,
    DELL,
    HP,
    LENOVO,
    MACBOOK,
    MSI;

    public static BrandType fromString(final String s) {
        return BrandType.valueOf(s);
    }
}
