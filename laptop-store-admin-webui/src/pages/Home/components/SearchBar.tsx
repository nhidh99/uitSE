import React, { memo } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
    placeholder: string;
};

function SearchBar({ placeholder }: Props) {
    return (
        <div className="flex w-full border border-gray-300 shadow rounded">
            <input
                className="px-4 py-2 
                focus:outline-none w-full
                text-xs sm:text-sm md:text-base"
                placeholder={placeholder}
            />
            <button
                type="submit"
                className="px-3 border-l border-gray-300 focus:outline-none rounded-none"
            >
                <FaSearch />
            </button>
        </div>
    );
}

export default memo(SearchBar);
