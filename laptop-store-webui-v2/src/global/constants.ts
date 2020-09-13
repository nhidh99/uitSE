export const MAXIMUM_QUANTITY_PER_PRODUCT = 20;

export const Converter = {
    CPU: {
        INTEL_CORE_I3: "Intel Core i3",
        INTEL_CORE_I5: "Intel Core i5",
        INTEL_CORE_I7: "Intel Core i7",
        INTEL_CELERON: "Intel Celeron",
        INTEL_PENTIUM: "Intel Pentium",
        AMD: "AMD",
    } as { [key: string]: string },

    RESOLUTION: {
        FULL_HD: "Full HD",
        HD: "HD",
        WXGA_PLUS: "WXGA+",
        RETINA: "Retina",
    } as { [key: string]: string },

    BRAND: {
        MACBOOK: "Macbook",
        DELL: "Dell",
        ACER: "Acer",
        HP: "HP",
        LENOVO: "Lenovo",
        ASUS: "Asus",
        MSI: "MSI",
    } as { [key: string]: string },

    PIN: {
        REMOVABLE: "PIN rời",
        NON_REMOVABLE: "PIN liền",
    } as { [key: string]: string },

    CARD_DESIGN: {
        INTEGRATED: "Card đồ họa tích hợp",
        DISCRETE: "Card đồ họa rời",
    } as { [key: string]: string },
};

export const RoleConstants = {
    GUEST: "GUEST",
    USER: "USER",
    ADMIN: "ADMIN",
};

export const NumberConstants = {
    REFRESH_TOKEN_LIFESPAN: 600_000,
};
