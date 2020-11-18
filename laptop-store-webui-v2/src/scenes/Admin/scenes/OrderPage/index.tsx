import React, { memo } from "react";
import { SSC } from "../../share.styles";
import SearchForm from "../components/SearchForm";
import OrderTable from "./components/OrderTable";

const OrderPage = () => (
    <>
        <SSC.SectionTitle>Danh sách đơn hàng</SSC.SectionTitle>
        <SearchForm placeholder="Tìm kiếm theo mã đơn hàng" />
        <OrderTable />
    </>
);

export default memo(OrderPage);
