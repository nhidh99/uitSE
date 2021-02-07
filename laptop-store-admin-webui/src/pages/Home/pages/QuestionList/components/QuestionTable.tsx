import React, { memo } from "react";
import QuestionItemModel from "@/types/model/QuestionItemModel";
import TabBar from "@/pages/Home/components/TabBar";
import { TABS } from "@/constants/tabs";

type Props = {
    list?: QuestionItemModel[];
};

function QuestionTable({ list }: Props) {
    return (
        <div className="border rounded shadow">
            <TabBar tabs={TABS.FEEDBACK} targetParam="status" />
            <table className="text-xs md:text-sm w-full">
                <tr>
                    <th className="p-2 w-1/12">Mã CH</th>
                    <th className="p-2 w-2/12">Thời gian</th>
                    <th className="p-2 w-3/12 text-left">Sản phẩm</th>
                    <th className="p-2 w-2/12 text-left">Người gửi</th>
                    <th className="p-2 w-4/12 text-left">Nội dung</th>
                </tr>
                {list?.map((item) => (
                    <tr className="border-t">
                        <td className="p-2 text-center">{item.id}</td>
                        <td className="p-2 text-center">{item.created_at}</td>
                        <td className="p-2">{item.product_name}</td>
                        <td className="p-2">{item.author_name}</td>
                        <td className="p-2">{item.question}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default memo(QuestionTable);
