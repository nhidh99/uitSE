import React, { memo, useMemo } from "react";
import { FaBoxes } from "react-icons/fa";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import Paginate from "../../../../../../components/Paginate";
import orderApi from "../../../../../../services/api/orderApi";
import useTableFetch from "../../../../../../services/hooks/useTableFetch";
import OrderSummaryModel from "../../../../../../values/models/OrderSummaryModel";
import { SSC } from "../../../../share.styles";
import { SC } from "./styles";

const OrderTable = () => {
    const { list, count, page, setTarget } = useTableFetch<OrderSummaryModel>(orderApi.getByPage);

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

    return list ? (
        count > 0 ? (
            <>
                <SC.Table>
                    <tr>
                        {headers.map((header) => (
                            <th
                                onClick={header.target ? () => setTarget(header.target) : undefined}
                                className={"sortable"}
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
