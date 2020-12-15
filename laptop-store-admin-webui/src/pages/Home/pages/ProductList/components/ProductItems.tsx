import ProductItemModel from "@/types/model/ProductItemModel";
import React, { memo } from "react";
import { FaStar } from "react-icons/fa";

type Props = {
    list?: ProductItemModel[];
};

function ProductItems({ list }: Props) {
    return (
        <div className="flex flex-col gap-5 text-xs">
            {list?.map((item) => (
                <div className="border rounded shadow p-3 flex gap-4 items-center">
                    <div className="flex flex-col">
                        <img src={item.image_url} width={40} height={40} />
                        <div className="flex gap-1 items-center text-yellow-500 m-auto">
                            {item.avg_rating.toFixed(1)} <FaStar />
                        </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <div className="font-semibold">
                            Mã SP: {item.id} - SL: {item.quantity}
                        </div>

                        <div>{item.name}</div>

                        <div className="text-red-700">
                            Đơn giá: {item.unit_price.toLocaleString()}
                            <sup>đ</sup>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default memo(ProductItems);
