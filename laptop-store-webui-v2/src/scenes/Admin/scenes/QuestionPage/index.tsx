import React, { memo } from "react";
import { SSC } from "../../share.styles";
import SearchForm from "../components/SearchForm";
import QuestionTable from "./components/QuestionTable";

const QuestionPage = () => (
    <>
        <SSC.SectionTitle>Danh sách câu hỏi</SSC.SectionTitle>
        <SearchForm placeholder="Tìm kiếm theo mã câu hỏi hoặc người gửi" />
        <QuestionTable />
    </>
);

export default memo(QuestionPage);
