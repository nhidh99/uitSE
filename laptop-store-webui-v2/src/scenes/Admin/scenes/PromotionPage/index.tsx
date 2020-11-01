import React, { memo } from "react";
import PromotionSearch from "./components/PromotionSearch";
import PromotionHeader from "./components/PromotionHeader";
import PromotionTable from "./components/PromotionTable";

const PromotionPage = () => (
    <>
        <PromotionHeader />
        <PromotionSearch />
        <PromotionTable />
    </>
);

export default memo(PromotionPage);
