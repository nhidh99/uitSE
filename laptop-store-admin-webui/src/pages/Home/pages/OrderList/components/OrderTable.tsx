import React, { memo } from "react";
import OrderItemModel from "@/types/model/OrderItemModel";
import TabBar from "@/pages/Home/components/TabBar";
import { TABS } from "@/constants/tabs";

type Props = {
    list?: OrderItemModel[];
};

function OrderTable({ list }: Props) {
    return (
        <div className="border rounded shadow">
            <TabBar tabs={TABS.ORDER} targetParam="status" />
            <table className="text-xs lg:text-sm w-full">
                <tr>
                    <th className="p-2 w-1/12">Mã ĐH</th>
                    <th className="p-2 w-1/12">Ngày đặt</th>
                    <th className="p-2 w-2/12 text-left">Khách hàng</th>
                    <th className="p-2 w-1/12">Điện thoại</th>
                    <th className="p-2 w-5/12 text-left">Địa chỉ</th>
                    <th className="p-2 w-2/12">Thành tiền</th>
                </tr>
                {list?.map((item) => (
                    <tr className="border-t">
                        <td className="p-2 text-center">{item.id}</td>
                        <td className="p-2 text-center">{item.order_date}</td>
                        <td className="p-2">{item.receiver_name}</td>
                        <td className="p-2 text-center">{item.receiver_phone}</td>
                        <td className="p-2">{item.order_location}</td>
                        <td className="p-2 text-center">
                            {item.total_price.toLocaleString()}
                            <sup>đ</sup>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default memo(OrderTable);
