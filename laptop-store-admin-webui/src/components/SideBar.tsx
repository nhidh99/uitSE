import React, { memo, useMemo } from "react";
import { FaBoxes, FaComment, FaGift, FaLaptop, FaQuestionCircle, FaStar } from "react-icons/fa";

function SideBar() {
    const items = useMemo(
        () => [
            {
                icon: <FaLaptop />,
                name: "Sản phẩm"
            },
            {
                icon: <FaGift />,
                name: "Khuyến mãi"
            },
            {
                icon: <FaBoxes />,
                name: "Đơn hàng"
            },
            {
                icon: <FaStar />,
                name: "Đánh giá"
            },
            {
                icon: <FaQuestionCircle />,
                name: "Câu hỏi"
            },
            {
                icon: <FaComment />,
                name: "Trả lời"
            }
        ],
        []
    );

    return (
        <div className="w-52 bg-gray-200 overflow-x-hidden shadow-md text-sm">
            {items.map((item) => (
                <div className="px-5 py-2.5 hover:bg-gray-300 cursor-pointer flex gap-2 items-center">
                    {item.icon} {item.name}
                </div>
            ))}
        </div>
    );
}

export default memo(SideBar);
