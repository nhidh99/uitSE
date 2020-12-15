import React, { memo, ReactNode } from "react";
import SearchBar from "./SearchBar";

type Props = {
    searchPlaceholder: string;
    actionButtons: ReactNode;
};

function Toolbar(props: Props) {
    const { searchPlaceholder, actionButtons } = props;
    return (
        <div className="flex justify-between gap-3">
            <SearchBar placeholder={searchPlaceholder} />
            <div className="flex gap-3">{actionButtons}</div>
        </div>
    );
}

export default memo(Toolbar);
