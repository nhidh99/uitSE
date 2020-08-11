package org.example.type;

public enum LaptopTagType {
    OFFICE,
    TECHNICAL,
    LIGHTWEIGHT,
    GAMING,
    LUXURY;

    public static LaptopTagType fromString(final String s) {
        return LaptopTagType.valueOf(s);
    }
}
