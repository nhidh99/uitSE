package org.example.type;

public enum BatterType {
    REMOVABLE,
    NON_REMOVABLE;

    public static BatterType fromString(final String s) {
        return BatterType.valueOf(s);
    }
}