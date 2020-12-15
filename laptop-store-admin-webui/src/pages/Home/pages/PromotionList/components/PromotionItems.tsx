import PromotionItemModel from "@/types/model/PromotionItemModel";
import React, { memo } from "react";

type Props = {
    list?: PromotionItemModel[];
};

function PromotionItems({ list }: Props) {
    return (
        <div className="flex flex-col gap-5 text-xs">
            {list?.map((item) => (
                <div className="border rounded shadow p-2 flex gap-4 items-center">
                    <div className="flex flex-col">
                        <img src={item.image_url} width={40} height={40} />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <div className="font-semibold">
                            Mã SP: {item.id} - SL: {item.quantity}
                        </div>

                        <div>{item.name}</div>

                        <div className="text-red-700">
                            Đơn giá: {item.price.toLocaleString()}
                            <sup>đ</sup>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default memo(PromotionItems);
