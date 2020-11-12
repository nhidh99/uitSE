import React, { memo, useMemo } from "react";
import {
    FaBox,
    FaBoxes,
    FaCheckCircle,
    FaClipboardCheck,
    FaSync,
    FaTimes,
    FaTruck,
    FaTruckLoading,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import Paginate from "../../../../../../components/Paginate";
import orderApi from "../../../../../../services/api/orderApi";
import useTableFetch from "../../../../../../services/hooks/useTableFetch";
import { RootState } from "../../../../../../services/redux/rootReducer";
import OrderSummaryModel from "../../../../../../values/models/OrderSummaryModel";
import TabHeader from "../TabHeader";
import { SC } from "./styles";

const OrderTable = () => {
    const { list, count, page, setTarget } = useTableFetch<OrderSummaryModel>(orderApi.getByPage);
    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading);

    const tabs = useMemo(
        () => [
            {
                icon: <FaSync />,
                title: "Chờ duyệt",
                value: "pending",
            },
            {
                icon: <FaClipboardCheck />,
                title: "Tiếp nhận",
                value: "received",
            },
            {
                icon: <FaBox />,
                title: "Đóng gói",
                value: "packaged",
            },
            {
                icon: <FaTruck />,
                title: "Vận chuyển",
                value: "delivering",
            },
            {
                icon: <FaCheckCircle />,
                title: "Đã giao",
                value: "delivered",
            },
            {
                icon: <FaTimes />,
                title: "Đã hủy",
                value: "canceled",
            },
        ],
        []
    );

    const headers = useMemo(
        () => [
            { name: "Mã ĐH", target: "id" },
            { name: "Ngày đặt", target: "order_date" },
            { name: "Người nhận", target: "receiver_name" },
            { name: "Điện thoại", target: undefined },
            { name: "Địa chỉ", target: undefined },
            { name: "Thành tiền", target: "total_price" },
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

                            {list.map((order) => (
                                <tr>
                                    <td className="id">{order.id}</td>
                                    <td className="date">{order.order_date}</td>
                                    <td className="name">{order.receiver_name}</td>
                                    <td className="phone">{order.receiver_phone}</td>
                                    <td className="location">{order.order_location}</td>
                                    <td className="price">
                                        {order.total_price.toLocaleString()}
                                        <u>đ</u>
                                    </td>
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
