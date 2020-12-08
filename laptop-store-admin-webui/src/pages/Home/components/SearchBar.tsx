import React, { memo } from "react";

type Props = {
    placeholder: string;
};

function SearchBar({ placeholder }: Props) {
    return <input className="" placeholder={placeholder} />;
}

export default memo(SearchBar);
