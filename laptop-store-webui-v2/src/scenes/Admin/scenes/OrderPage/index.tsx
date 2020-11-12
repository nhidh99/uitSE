import React, { memo } from "react";
import { SSC } from "../../share.styles";
import OrderSearch from "./components/OrderSearch";
import OrderTable from "./components/OrderTable";

const OrderPage = () => (
    <>
        <SSC.SectionTitle>Danh sách đơn hàng</SSC.SectionTitle>
        <SSC.SearchContainer>
            <OrderSearch />
        </SSC.SearchContainer>
        <OrderTable />
    </>
);

export default memo(OrderPage);
