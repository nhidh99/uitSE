package org.example.type;

public enum  HardDriveType {
    HDD,
    SSD,
    eMMC;

    public static HardDriveType fromString(final String s) {
        return HardDriveType.valueOf(s);
    }
}
