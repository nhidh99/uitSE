/* eslint-disable react-hooks/exhaustive-deps */
import { PATHS } from "@/constants/paths";
import { RootState } from "@/services/redux/rootReducer";
import { setMenuStatus } from "@/services/redux/slices/menuSlice";
import React, { memo, useCallback, useMemo } from "react";
import { FaBoxes, FaComment, FaGift, FaLaptop, FaQuestionCircle, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
    const dispatch = useDispatch();
    const menuStatus = useSelector((state: RootState) => state.menuStatus);
    const location = useLocation();

    const closeSideBar = useCallback(function closeSideBar() {
        if (window.innerWidth < 768) {
            dispatch(setMenuStatus("close"));
        }
    }, []);

    const items = useMemo(
        () => [
            {
                icon: <FaLaptop />,
                name: "Sản phẩm",
                link: PATHS.PRODUCTS
            },
            {
                icon: <FaGift />,
                name: "Khuyến mãi",
                link: PATHS.PROMOTIONS
            },
            {
                icon: <FaBoxes />,
                name: "Đơn hàng",
                link: PATHS.ORDERS
            },
            {
                icon: <FaStar />,
                name: "Đánh giá",
                link: PATHS.RATINGS
            },
            {
                icon: <FaQuestionCircle />,
                name: "Câu hỏi",
                link: PATHS.QUESTIONS
            },
            {
                icon: <FaComment />,
                name: "Trả lời",
                link: PATHS.ANSWERS
            }
        ],
        []
    );

    return (
        <>
            <div
                className={`sm:hidden 
                ${
                    menuStatus === "close"
                        ? "hidden"
                        : "fixed z-10 bg-black opacity-5 w-full h-full"
                }`}
                onClick={closeSideBar}
            />
            <div
                id="side-bar"
                className={`
                    bg-gray-200
                    overflow-x-hidden
                    shadow-none sm:shadow-xl
                    h-full sm:h-auto
                    fixed sm:relative sm:flex-shrink-0
                    z-20 sm:z-0
                    ${menuStatus === "close" ? "hidden sm:w-16 sm:block" : "w-2/3 sm:w-48"}`}
            >
                {items.map((item) => (
                    <Link
                        className={`
                            text-sm md:text-base 
                            px-5 ${menuStatus === "open" ? "py-2.5" : "py-3.5"}
                            hover:bg-gray-300 select-none
                            cursor-pointer flex gap-2 items-center
                            border-gray-300 border-b sm:border-b-0
                            ${location.pathname.startsWith(item.link) && "bg-gray-300 font-bold"}`}
                        to={item.link}
                        onClick={closeSideBar}
                    >
                        {item.icon} {menuStatus === "open" && item.name}
                    </Link>
                ))}
            </div>
        </>
    );
}

export default memo(SideBar);
