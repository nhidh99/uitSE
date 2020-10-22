import React from "react";
import CheckboxesFilter from "../CheckboxesFilter";

const CPUFilter = () => {
    const options = [
        {
            value: "INTEL_CORE_I7",
            name: "Intel Core i7",
        },
        {
            value: "INTEL_CORE_I5",
            name: "Intel Core i5",
        },
        {
            value: "INTEL_CORE_I3",
            name: "Intel Core i3",
        },
        {
            value: "CELERON_PENTIUM",
            name: "Intel Core Celeron/Pentium",
        },
        {
            value: "AMD",
            name: "AMD",
        },
    ];

    return <CheckboxesFilter title="CPU" type="cpus" options={options} />;
};

export default CPUFilter;
