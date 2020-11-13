import React, { memo } from "react";
import { SSC } from "../../share.styles";
import OrderSearch from "./components/OrderSearch";
import OrderTable from "./components/OrderTable";

const QuestionPage = () => (
    <>
        <SSC.SectionTitle>Danh sách câu hỏi</SSC.SectionTitle>
        <SSC.SearchContainer>
            <OrderSearch />
        </SSC.SearchContainer>
        <OrderTable />
    </>
);

export default memo(QuestionPage);
