/* eslint-disable react-hooks/exhaustive-deps */
import { PATHS } from "@/constants/paths";
import useScreenWidth from "@/services/hooks/useScreenWidth";
import { RootState } from "@/services/redux/rootReducer";
import { setMenuStatus } from "@/services/redux/slices/menuSlice";
import React, { memo, useMemo } from "react";
import { FaBoxes, FaComment, FaGift, FaLaptop, FaQuestionCircle, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
    const dispatch = useDispatch();
    const menuStatus = useSelector((state: RootState) => state.menuStatus);
    const location = useLocation();
    const screenWidth = useScreenWidth();

    function closeSideBar() {
        if (screenWidth < 768) {
            dispatch(setMenuStatus("close"));
        }
    }

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
        menuStatus !== "close" && (
            <>
                <div
                    className="sm:hidden fixed z-10 w-full h-full bg-black opacity-5"
                    onClick={closeSideBar}
                />
                <div
                    id="side-bar"
                    className={`bg-gray-200 
                    overflow-x-hidden
                    shadow-none sm:shadow-xl
                    w-2/3 ${menuStatus === "minimize" ? "sm:w-16" : "sm:w-48"}
                    h-full sm:h-auto
                    fixed sm:relative
                    z-20 sm:z-0`}
                >
                    {items.map((item) => (
                        <Link
                            className={`text-sm md:text-base 
                            px-5 ${menuStatus === "minimize" ? "py-3.5" : "py-2.5"}
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
        )
    );
}

export default memo(SideBar);
