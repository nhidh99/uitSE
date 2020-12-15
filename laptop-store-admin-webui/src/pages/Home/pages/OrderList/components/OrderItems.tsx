import { TABS } from "@/constants/tabs";
import TabBar from "@/pages/Home/components/TabBar";
import OrderItemModel from "@/types/model/OrderItemModel";
import React, { memo } from "react";
import { FaClock, FaDollarSign, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";

type Props = {
    list?: OrderItemModel[];
};

function OrderItems({ list }: Props) {
    return (
        <div className="flex flex-col gap-5 text-xs">
            <TabBar tabs={TABS.ORDER} targetParam="status" />
            {list?.map((item) => (
                <div className="border rounded shadow p-3 flex flex-col gap-2 ">
                    <div className="text-sm font-semibold text-red-800">Đơn hàng #{item.id}</div>

                    <div className="flex gap-1">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <div className="flex items-center gap-1.5">
                                <FaClock /> {item.order_date}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FaPhone /> {item.receiver_phone}
                            </div>
                            <div className="flex gap-1.5">
                                <FaUser className="mt-0.5" /> {item.receiver_name}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 flex-1">
                            <div className="flex items-center gap-1.5 text-green-700">
                                <FaDollarSign className="-mx-0.5" />
                                <span>
                                    {item.total_price.toLocaleString()}
                                    <sup>đ</sup>
                                </span>
                            </div>
                            <div className="flex gap-1.5 text-blue-600">
                                <FaMapMarkerAlt className="mt-0.5 text-sm" />
                                {item.order_location}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default memo(OrderItems);
