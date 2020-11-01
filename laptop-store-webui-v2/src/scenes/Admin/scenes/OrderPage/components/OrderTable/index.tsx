import React, { memo, useMemo } from "react";
import orderApi from "../../../../../../services/api/orderApi";
import useTableFetch from "../../../../../../services/hooks/useTableFetch";
import OrderSummaryModel from "../../../../../../values/models/OrderSummaryModel";
import { SC } from "./styles";

const OrderTable = () => {
    const { list, setTarget } = useTableFetch<OrderSummaryModel>(orderApi.getByPage);

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

            {list
                ? list.map((order) => (
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
                  ))
                : null}
        </SC.Table>
    );
};

export default memo(OrderTable);
