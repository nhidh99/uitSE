import React from "react";
import { FaBox, FaCheckCircle, FaClipboardCheck, FaSync, FaTimes, FaTruck } from "react-icons/fa";

export const TABS = {
    ORDER: [
        {
            icon: <FaSync />,
            title: "Chờ duyệt",
            value: "pending"
        },
        {
            icon: <FaClipboardCheck />,
            title: "Tiếp nhận",
            value: "received"
        },
        {
            icon: <FaBox />,
            title: "Đóng gói",
            value: "packaged"
        },
        {
            icon: <FaTruck />,
            title: "Vận chuyển",
            value: "delivering"
        },
        {
            icon: <FaCheckCircle />,
            title: "Đã giao",
            value: "delivered"
        },
        {
            icon: <FaTimes />,
            title: "Đã hủy",
            value: "canceled"
        }
    ]
};
