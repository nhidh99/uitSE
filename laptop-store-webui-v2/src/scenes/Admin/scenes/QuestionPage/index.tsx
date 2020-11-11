import React, { memo } from "react";
import { SSC } from "../../share.styles";
import OrderFilter from "./components/OrderFilter";
import OrderSearch from "./components/OrderSearch";
import OrderTable from "./components/OrderTable";

const QuestionPage = () => (
    <>
        <SSC.SectionTitle>Danh sách đơn hàng</SSC.SectionTitle>
        <SSC.SearchContainer>
            <OrderFilter />
            <OrderSearch />
        </SSC.SearchContainer>
        <OrderTable />
    </>
);

export default memo(QuestionPage);
