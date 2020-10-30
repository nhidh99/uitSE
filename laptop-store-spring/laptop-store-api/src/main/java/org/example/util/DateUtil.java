package org.example.util;

import org.example.constant.OrderConstants;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;

public class DateUtil {
    private static final ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");

    public static LocalDate addWorkingDays(LocalDate date, int workdays) {
        if (workdays < 1) {
            return date;
        }
        LocalDate result = date;
        int addedDays = 0;
        while (addedDays < workdays) {
            result = result.plusDays(1);
            boolean isWeekend = result.getDayOfWeek() == DayOfWeek.SATURDAY || result.getDayOfWeek() == DayOfWeek.SUNDAY;
            if (!isWeekend) {
                ++addedDays;
            }
        }
        return result;
    }

    public static LocalDate getCurrentLocalDate() {
        return LocalDate.now(zoneId);
    }
}