import React, { memo, useMemo } from "react";
import { FaBoxes, FaCheckCircle, FaSync, FaTimes, FaTruckLoading } from "react-icons/fa";
import { useSelector } from "react-redux";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import Paginate from "../../../../../../components/Paginate";
import questionApi from "../../../../../../services/api/questionApi";
import useTableFetch from "../../../../../../services/hooks/useTableFetch";
import { RootState } from "../../../../../../services/redux/rootReducer";
import QuestionModel from "../../../../../../values/models/QuestionModel";
import TabHeader from "../../../OrderPage/components/TabHeader";
import { SC } from "./styles";

const OrderTable = () => {
    const { list, count, page, setTarget } = useTableFetch<QuestionModel>(questionApi.getByStatus);
    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading);

    const headers = useMemo(
        () => [
            { name: "Mã CH", target: "id" },
            { name: "Người gửi", target: "author_name" },
            { name: "Nội dung", target: undefined },
            { name: "Thời gian gửi", target: "created_at" },
        ],
        []
    );

    const tabs = useMemo(
        () => [
            {
                icon: <FaSync />,
                title: "Chờ duyệt",
                value: "pending",
            },
            {
                icon: <FaCheckCircle />,
                title: "Đã duyệt",
                value: "approved",
            },
            {
                icon: <FaTimes />,
                title: "Đã hủy",
                value: "rejected",
            },
        ],
        []
    );

    return (
        <>
            <SC.Container className={loading ? "loading" : undefined}>
                <TabHeader items={tabs} targetParam="status" />
                {list ? (
                    count > 0 ? (
                        <SC.Table>
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        onClick={
                                            header.target
                                                ? () => setTarget(header.target)
                                                : undefined
                                        }
                                        className={header.target ? "sortable" : undefined}
                                    >
                                        {header.name}
                                    </th>
                                ))}
                            </tr>

                            {list.map((question) => (
                                <tr>
                                    <td className="id">{question.id}</td>
                                    <td className="name">{question.created_at}</td>
                                    <td className="date">{question.author_name}</td>
                                    <td className="phone">{question.question}</td>
                                </tr>
                            ))}
                        </SC.Table>
                    ) : (
                        <EmptyBlock icon={<FaBoxes />} title={"Không có đơn hàng"} />
                    )
                ) : (
                    <EmptyBlock icon={<FaTruckLoading />} title="Đang tải thông tin" />
                )}
            </SC.Container>
            <Paginate count={count} initialPage={page || 1} sizePerPage={10} />
        </>
    );
};

export default memo(OrderTable);
