import React, { memo } from "react";
import TabBar from "@/pages/Home/components/TabBar";
import { TABS } from "@/constants/tabs";
import RatingItemModel from "@/types/model/RatingItemModel";
import { FaStar } from "react-icons/fa";

type Props = {
    list?: RatingItemModel[];
};

function RatingTable({ list }: Props) {
    return (
        <div className="border rounded shadow">
            <TabBar tabs={TABS.FEEDBACK} targetParam="status" />
            <table className="text-xs md:text-sm w-full">
                <tr>
                    <th className="p-2 w-1/12">Mã ĐG</th>
                    <th className="p-2 w-2/12">Thời gian</th>
                    <th className="p-2 w-2/12 text-left">Sản phẩm</th>
                    <th className="p-2 w-2/12 text-left">Người gửi</th>
                    <th className="p-2 w-5/12 text-left">Nội dung</th>
                </tr>
                {list?.map((item) => (
                    <tr className="border-t">
                        <td className="p-2 text-center">{item.id}</td>
                        <td className="p-2 text-center">{item.created_at}</td>
                        <td className="p-2">{item.product_name}</td>
                        <td className="p-2">{item.author_name}</td>
                        <td className="p-2">
                            <div className="inline-block mr-1.5 text-yellow-600">
                                <span className="flex gap-1 items-center">
                                    {item.point} <FaStar className="text-xs -mt-0.5" />
                                </span>
                            </div> 
                            {item.detail}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default memo(RatingTable);
