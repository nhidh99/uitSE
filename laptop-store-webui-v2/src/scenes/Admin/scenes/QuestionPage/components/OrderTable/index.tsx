import React, { memo, useMemo } from "react";
import { FaBoxes } from "react-icons/fa";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import Paginate from "../../../../../../components/Paginate";
import questionApi from "../../../../../../services/api/questionApi";
import useTableFetch from "../../../../../../services/hooks/useTableFetch";
import QuestionModel from "../../../../../../values/models/QuestionModel";
import { SSC } from "../../../../share.styles";
import { SC } from "./styles";

const OrderTable = () => {
    const { list, count, page, setTarget } = useTableFetch<QuestionModel>(questionApi.getByStatus);

    const headers = useMemo(
        () => [
            { name: "Mã CH", target: "id" },
            { name: "Người gửi", target: "author_name" },
            { name: "Nội dung", target: undefined },
            { name: "Thời gian gửi", target: "created_at" },
        ],
        []
    );

    return list ? (
        count > 0 ? (
            <>
                <SC.Table>
                    <tr>
                        {headers.map((header) => (
                            <th
                                onClick={header.target ? () => setTarget(header.target) : undefined}
                                className={header.target ? "sortable" : ""}
                            >
                                {header.name}
                            </th>
                        ))}
                    </tr>

                    {list.map((question) => (
                        <tr>
                            <td className="id">{question.id}</td>
                            <td className="author-name">{question.author_name}</td>
                            <td className="question">{question.question}</td>
                            <td className="created-at">{question.created_at}</td>
                        </tr>
                    ))}
                </SC.Table>
                <Paginate count={count} initialPage={page || 1} sizePerPage={10} />
            </>
        ) : (
            <SSC.EmptyContainer>
                <EmptyBlock icon={<FaBoxes />} title={"Không có đơn hàng"} borderless />
            </SSC.EmptyContainer>
        )
    ) : null;
};

export default memo(OrderTable);
