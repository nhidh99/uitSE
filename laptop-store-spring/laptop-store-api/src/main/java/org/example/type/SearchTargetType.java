package org.example.type;
import com.google.common.base.CaseFormat;

public enum SearchTargetType {
    ID,
    NAME,
    QUANTITY,
    UNIT_PRICE,
    TOTAL_PRICE,
    RATING,
    ORDER_DATE,
    RECEIVER_NAME,
    STATUS,
    PRICE;

    @Override
    public String toString() {
        return CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.LOWER_CAMEL, this.name());
    }
}
