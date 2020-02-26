package gov.uspto.patent.ptab.utils;

/**
 * Week Days
 *
 * @author 2020 Development Team
 *
 */

public enum DaysNamesEnum {
    MONDAY("monday"), TUESDAY("tuesday"), WEDNESDAY("wednesday"), THURSDAY("thursday"), FRIDAY("friday");

    private String dayName;

    private DaysNamesEnum(final String dayName) {
        this.dayName = dayName;
    }

    public String dayName() {
        return dayName;
    }
}
