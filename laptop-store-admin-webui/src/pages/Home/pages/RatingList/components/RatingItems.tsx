import { TABS } from "@/constants/tabs";
import TabBar from "@/pages/Home/components/TabBar";
import RatingItemModel from "@/types/model/RatingItemModel";
import React, { memo } from "react";
import { FaClock, FaLaptop, FaQuestionCircle, FaStar, FaUser } from "react-icons/fa";

type Props = {
    list?: RatingItemModel[];
};

function RatingItems({ list }: Props) {
    return (
        <div className="flex flex-col gap-5 text-xs">
            <TabBar tabs={TABS.FEEDBACK} targetParam="status" />
            {list?.map((item) => (
                <div className="border rounded shadow p-3 flex gap-4 items-center">
                    <div className="flex flex-col gap-0.5">
                        <div className="font-semibold text-red-800">Đánh giá #{item.id}</div>

                        <div className="flex gap-1.5">
                            <span>
                                <FaUser className="mt-0.5" />
                            </span>
                            <div>
                                <span className="font-semibold">
                                    {item.author_name.split(" ").splice(-2).join(" ")}
                                </span>{" "}
                                đã đánh giá
                                <div className="inline-block ml-1 text-yellow-600">
                                    <span className="flex gap-0.5 items-center">
                                        {item.point} <FaStar className="text-xs -mt-0.5" />
                                    </span>
                                </div>{" "}
                            </div>
                        </div>

                        <div className="flex gap-1.5">
                            <span>
                                <FaClock className="mt-0.5" />
                            </span>{" "}
                            {item.created_at}
                        </div>

                        <div className="flex gap-1.5 text-green-700">
                            <span>
                                <FaLaptop className="mt-0.5" />
                            </span>{" "}
                            {item.product_name}
                        </div>

                        <div className="flex gap-1.5 text-blue-600">
                            <span>
                                <FaQuestionCircle className="mt-0.5" />
                            </span>{" "}
                            {item.detail}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default memo(RatingItems);
