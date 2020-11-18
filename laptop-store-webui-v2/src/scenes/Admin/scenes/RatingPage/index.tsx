import React, { memo } from "react";
import { SSC } from "../../share.styles";
import SearchForm from "../components/SearchForm";
import RatingTable from "./components/RatingTable";

const RatingPage = () => (
    <>
        <SSC.SectionTitle>Danh sách đánh giá</SSC.SectionTitle>
        <SearchForm placeholder="Tìm kiếm theo mã hoặc tên" />
        <RatingTable />
    </>
);

export default memo(RatingPage);
