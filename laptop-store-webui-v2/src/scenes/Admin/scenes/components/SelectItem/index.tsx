import React, { memo } from "react";

const SelectItem = () => {
    return (
        <td
            onClick={(e) => {
                // @ts-ignore
                e.target.firstChild.click();
                e.stopPropagation();
            }}
            className="select"
        >
            <input type="checkbox" onClick={(e) => e.stopPropagation()} />
        </td>
    );
};

export default memo(SelectItem);
