import React, { memo, useMemo } from "react";
import { SC } from "./styles";
import { SSC } from "../../share.styles";
import useTableFetch from "../../../../services/hooks/useTableFetch";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import OrderSummaryModel from "../../../../values/models/OrderSummaryModel";
import orderApi from "../../../../services/api/orderApi";

const OrderPage = () => {
    const { list, count, setPage, setTarget } = useTableFetch<OrderSummaryModel>(
        orderApi.getByPage,
        {
            target: "id",
            order: "desc",
            page: 1,
        }
    );

    const headers = useMemo(
        () => [
            { name: "Ma don hang", target: "id" },
            { name: "Ngay dat", target: "order_date" },
            { name: "Nguoi nhan", target: "receiver_name" },
            { name: "Dien thoai", target: undefined },
            { name: "Dia chi", target: undefined },
            { name: "Thanh tien", target: "total_price" },
        ],
        []
    );

    return (
        <>
            <SSC.SectionTitle>Danh sách đơn hàng</SSC.SectionTitle>

            <SSC.SearchContainer>
                <SSC.SearchInput placeholder="Tìm kiếm theo mã hoặc tên" />
                <SSC.Select>
                    <option>Chờ duyệt</option>
                    <option>Tiếp nhận</option>
                    <option>Đóng gói</option>
                    <option>Vận chuyển</option>
                    <option>Đã giao</option>
                    <option>Đã huỷ</option>
                </SSC.Select>
                <SSC.SearchButton>
                    <FaSearch style={{ marginBottom: "-2px", marginRight: "5px" }} />
                    Tim kiem
                </SSC.SearchButton>
            </SSC.SearchContainer>

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
                              <td>{order.id}</td>
                              <td>{order.order_date}</td>
                              <td>{order.receiver_name}</td>
                              <td>{order.receiver_phone}</td>
                              <td>{order.order_location}</td>
                              <td>{order.total_price.toLocaleString()}</td>
                          </tr>
                      ))
                    : null}
            </SC.Table>
        </>
    );
};

export default memo(OrderPage);
