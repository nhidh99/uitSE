package org.example.type;

public enum GenderType {
    MALE,
    FEMALE,
    OTHER;

    public static GenderType fromString(final String s) {
        return GenderType.valueOf(s);
    }
}
