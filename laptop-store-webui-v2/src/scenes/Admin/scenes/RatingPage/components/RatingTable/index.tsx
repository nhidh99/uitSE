import React, { memo, useMemo } from "react";
import { FaCheckCircle, FaQuestionCircle, FaSync, FaTimes, FaTruckLoading } from "react-icons/fa";
import { useSelector } from "react-redux";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import Paginate from "../../../../../../components/Paginate";
import ratingApi from "../../../../../../services/api/ratingApi";
import useTableFetch from "../../../../../../services/hooks/useTableFetch";
import { RootState } from "../../../../../../services/redux/rootReducer";
import RatingSummaryModel from "../../../../../../values/models/RatingSummaryModel";
import TabHeader from "../../../OrderPage/components/TabHeader";
import { SC } from "./styles";

const RatingTable = () => {
    const { list, count, page, setTarget } = useTableFetch<RatingSummaryModel>(
        ratingApi.getByStatus
    );
    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading);

    const headers = useMemo(
        () => [
            { name: "Mã ĐG", target: "id" },
            { name: "Thời gian", target: "created_at" },
            { name: "Người gửi", target: "author_name" },
            { name: "Sản phẩm", target: "product_name" },
            { name: "Điểm", target: "point" },
            { name: "Nội dung", target: undefined },
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

                            {list.map((rating) => (
                                <tr>
                                    <td className="id">{rating.id}</td>
                                    <td className="date">{rating.created_at}</td>
                                    <td className="name">{rating.author_name}</td>
                                    <td className="product-name">{rating.product_name}</td>
                                    <td className="point">{rating.point}</td>
                                    <td className="rating">
                                        <div>{rating.detail}</div>
                                    </td>
                                </tr>
                            ))}
                        </SC.Table>
                    ) : (
                        <EmptyBlock icon={<FaQuestionCircle />} title={"Không có đánh giá"} />
                    )
                ) : (
                    <EmptyBlock icon={<FaTruckLoading />} title="Đang tải thông tin" />
                )}
            </SC.Container>
            <Paginate count={count} initialPage={page || 1} sizePerPage={10} />
        </>
    );
};

export default memo(RatingTable);
