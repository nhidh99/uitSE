import React, { memo, useMemo } from "react";
import { SC } from "./styles";
import { SSC } from "../../share.styles";
import useTableFetch from "../../../../services/hooks/useTableFetch";
import { FaSearch } from "react-icons/fa";
import OrderSummaryModel from "../../../../values/models/OrderSummaryModel";
import orderApi from "../../../../services/api/orderApi";
import { Formik } from "formik";

const OrderPage = () => {
    const { list, count, setPage, setTarget } = useTableFetch<OrderSummaryModel>(
        orderApi.getByPage
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

            <Formik initialValues={{ query: "", status: "pending" }} onSubmit={() => {}}>
                <SSC.SearchContainer>
                    <SSC.SearchInput name="query" placeholder="Tìm kiếm theo mã hoặc tên" />
                    <SSC.SearchInput name="status" component="select">
                        <option value="pending">Chờ duyệt</option>
                        <option value="received">Tiếp nhận</option>
                        <option value="packaged">Đóng gói</option>
                        <option value="delivering">Vận chuyển</option>
                        <option value="delivered">Đã giao</option>
                        <option value="canceled">Đã huỷ</option>
                    </SSC.SearchInput>
                    <SSC.SearchButton type="submit">
                        <FaSearch style={{ marginBottom: "-2px", marginRight: "5px" }} />
                        Tim kiem
                    </SSC.SearchButton>
                </SSC.SearchContainer>
            </Formik>

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
