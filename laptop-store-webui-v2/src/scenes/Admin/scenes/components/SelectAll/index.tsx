import React, { memo, MouseEvent, useCallback } from "react";

const SelectAll = () => {
    const selectAll = useCallback(
        (e: React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
            e.stopPropagation();
            const checkboxes = document.querySelectorAll("td input[type='checkbox']");
            // @ts-ignore
            checkboxes.forEach((c) => (c.checked = e.target.checked));
        },
        []
    );

    return (
        <th
            className="select"
            onClick={(e) => {
                // @ts-ignore
                e.currentTarget.firstChild.click();
            }}
        >
            <input type="checkbox" onClick={selectAll} />
        </th>
    );
};

export default memo(SelectAll);
