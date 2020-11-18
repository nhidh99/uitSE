import React, { memo } from "react";
import SearchForm from "../components/SearchForm";
import PromotionHeader from "./components/PromotionHeader";
import PromotionTable from "./components/PromotionTable";

const PromotionPage = () => (
    <>
        <PromotionHeader />
        <SearchForm placeholder="Tìm kiếm theo mã hoặc tên khuyến mãi" />
        <PromotionTable />
    </>
);

export default memo(PromotionPage);
