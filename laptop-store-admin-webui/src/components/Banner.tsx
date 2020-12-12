/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from "@/services/redux/rootReducer";
import { setMenuStatus } from "@/services/redux/slices/menuSlice";
import React, { memo } from "react";
import { FaDoorOpen, FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function Banner() {
    const dispatch = useDispatch();
    const menuStatus = useSelector((state: RootState) => state.menuStatus);

    function changeMenuStatus() {
        if (menuStatus !== "open") {
            dispatch(setMenuStatus("open"));
        } else {
            dispatch(setMenuStatus("close"));
        }
    }

    return (
        <header
            className="w-full bg-gray-900 text-white
            text-sm md:text-base lg:text-lg
            flex justify-between select-none 
            fixed z-30 md:z-0 md:relative"
        >
            <div className="flex items-center gap-2.5 pl-5 py-3">
                <button
                    className="-mb-0.5 cursor-pointer focus:outline-none"
                    onClick={changeMenuStatus}
                >
                    <FaList />
                </button>
                Laptop Store
            </div>
            <button
                className="hover:bg-gray-600 rounded-none
                flex items-center gap-2 px-4
                text-sm md:text-base 
                focus:outline-none
                border-l-2 border-gray-600"
            >
                <FaDoorOpen />
                <span className="hidden sm:inline">Đăng xuất</span>
            </button>
        </header>
    );
}

export default memo(Banner);
