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
                className={`md:hidden 
                ${
                    menuStatus === "close"
                        ? "hidden"
                        : "fixed z-10 top-0 bg-black opacity-5 w-full h-full"
                }`}
                onClick={closeSideBar}
            />
            <div
                className={`
                    bg-gray-200
                    overflow-x-hidden
                    shadow-none sm:shadow-xl
                    h-full md:h-auto
                    fixed top-11 md:top-0 md:relative md:flex-shrink-0
                    z-20 md:z-0
                    ${menuStatus === "close" ? "hidden md:w-16 md:block" : "w-2/3 md:w-48"}`}
            >
                {items.map((item) => (
                    <Link
                        className={`
                            text-xs sm:text-sm md:text-base 
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
