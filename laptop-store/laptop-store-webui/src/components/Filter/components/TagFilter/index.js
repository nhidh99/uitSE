import React from "react";
import CheckboxesFilter from "../CheckboxesFilter";

const TagFilter = () => {
    const options = [
        {
            value: "OFFICE",
            name: "Học tập, văn phòng",
        },
        {
            value: "TECHNICAL",
            name: "Đồ họa - Kỹ thuật",
        },
        {
            value: "GAMING",
            name: "Laptop Gaming",
        },
        {
            value: "LUXURY",
            name: "Cao cấp sang trọng",
        },
        {
            value: "LIGHTWEIGHT",
            name: "Mỏng nhẹ",
        },
    ];

    return <CheckboxesFilter title="Nhu cầu" type="tags" options={options} />;
};

export default TagFilter;
