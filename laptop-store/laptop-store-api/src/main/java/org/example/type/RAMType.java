package org.example.type;

public enum RAMType {
    DDR4,
    DDR3,
    DDR3L,
    LPDDR3,
    LPDDR4,
    LPDDR4X;

    public static RAMType fromString(final String s) {
        return RAMType.valueOf(s);
    }
}
