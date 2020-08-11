import React from "react";
import CheckboxesFilter from "../CheckboxesFilter";

const RAMFilter = () => {
    const options = [
        {
            value: 16,
            name: "16 GB",
        },
        {
            value: 8,
            name: "8 GB",
        },
        {
            value: 4,
            name: "4 GB",
        },
    ];

    return <CheckboxesFilter title="RAM" type="rams" options={options} />;
};

export default RAMFilter;
