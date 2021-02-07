import { TABS } from "@/constants/tabs";
import TabBar from "@/pages/Home/components/TabBar";
import QuestionItemModel from "@/types/model/QuestionItemModel";
import React, { memo } from "react";
import { FaLaptop, FaQuestionCircle, FaUser } from "react-icons/fa";

type Props = {
    list?: QuestionItemModel[];
};

function QuestionItems({ list }: Props) {
    return (
        <div className="flex flex-col gap-5 text-xs">
            <TabBar tabs={TABS.FEEDBACK} targetParam="status" />
            {list?.map((item) => (
                <div className="border rounded shadow p-3 flex gap-4 items-center">
                    <div className="flex flex-col gap-0.5">
                        <div className="font-semibold text-red-800">Câu hỏi #{item.id}</div>

                        <div className="flex gap-1.5">
                            <span>
                                <FaUser className="mt-0.5" />
                            </span>
                            <div>
                                <span className="font-semibold">
                                    {item.author_name.split(" ").splice(-2).join(" ")}
                                </span>{" "}
                                đã gửi lúc {item.created_at}
                            </div>
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
                            {item.question}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default memo(QuestionItems);
