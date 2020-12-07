import React, { memo } from "react";
import { Fa500Px, FaDoorOpen } from "react-icons/fa";

function Banner() {
    return (
        <div
            className="w-full bg-gray-900 
            text-sm md:text-base lg:text-lg
            text-white shadow-lg
            flex justify-between"
        >
            <div className="flex items-center gap-2 pl-5 py-3">
                <Fa500Px /> Laptop Store
            </div>
            <button
                className="hover:bg-gray-600 rounded-none
                flex items-center gap-2 px-4
                text-sm md:text-base 
                focus:outline-none"
            >
                <FaDoorOpen />
                Đăng xuất
            </button>
        </div>
    );
}

export default memo(Banner);
