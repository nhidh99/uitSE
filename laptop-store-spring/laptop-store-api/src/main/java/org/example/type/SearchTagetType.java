package org.example.type;
import com.google.common.base.CaseFormat;

public enum SearchTagetType {
    ID,
    NAME,
    QUANTITY,
    UNIT_PRICE,
    RATING,
    PRICE;

    @Override
    public String toString() {
        return CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.LOWER_CAMEL, this.name());
    }
}
