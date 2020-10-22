package org.example.type;

public enum CardDesignType {
    DISCRETE,
    INTEGRATED;

    public static CardDesignType fromString(final String s) {
        return CardDesignType.valueOf(s);
    }
}
