package org.example.type;

public enum CPUType {
    INTEL_CORE_I7,
    INTEL_CORE_I5,
    INTEL_CORE_I3,
    INTEL_CELERON,
    INTEL_PENTIUM,
    AMD;

    public static CPUType fromString(final String s) {
        return CPUType.valueOf(s);
    }
}