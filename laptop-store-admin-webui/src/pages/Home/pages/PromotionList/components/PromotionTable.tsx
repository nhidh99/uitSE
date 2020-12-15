import React, { memo } from "react";
import PromotionItemModel from "@/types/model/PromotionItemModel";

type Props = {
    list?: PromotionItemModel[];
};

function PromotionTable({ list }: Props) {
    return (
        <div className="border rounded shadow">
            <table className="text-xs md:text-sm w-full">
                <tr>
                    <th className="p-2 w-1/12">Mã SP</th>
                    <th className="p-2 w-6/12 text-left">Sản phẩm</th>
                    <th className="p-2 w-1/12">Hình ảnh</th>
                    <th className="p-2 w-1/12">Số lượng</th>
                    <th className="p-2 w-2/12">Đơn giá</th>
                </tr>
                {list?.map((item) => (
                    <tr className="border-t">
                        <td className="p-2 text-center">{item.id}</td>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">
                            <img className="m-auto" src={item.image_url} width={35} height={35} />
                        </td>
                        <td className="p-2 text-center">{item.quantity}</td>
                        <td className="p-2 text-center">
                            {item.price.toLocaleString()}
                            <sup>đ</sup>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default memo(PromotionTable);
