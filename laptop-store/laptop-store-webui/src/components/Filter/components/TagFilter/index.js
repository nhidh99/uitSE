import React from "react";
import CheckboxesFilter from "../CheckboxesFilter";

const TagFilter = () => {
    const options = [
        {
            value: 100003,
            name: "Học tập, văn phòng",
        },
        {
            value: 100004,
            name: "Đồ họa - Kỹ thuật",
        },
        {
            value: 100005,
            name: "Laptop Gaming",
        },
        {
            value: 100006,
            name: "Cao cấp sang trọng",
        },
        {
            value: 100007,
            name: "Mỏng nhẹ",
        },
    ];

    return <CheckboxesFilter title="Nhu cầu" type="tags" options={options} />;
};

export default TagFilter;
