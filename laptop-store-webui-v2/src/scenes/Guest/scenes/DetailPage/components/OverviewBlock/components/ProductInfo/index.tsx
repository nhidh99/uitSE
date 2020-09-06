import React from "react";
import OverviewInfo from "./components/OverviewInfo";
import SpecInfo from "./components/SpecInfo";
import PromotionInfo from "./components/PromotionInfo";
import ActionButtons from "./components/ActionButtons";
import { SC } from "./styles";

const ProductInfo = () => (
    <>
        {[
            <OverviewInfo />,
            <SpecInfo />,
            <PromotionInfo />,
            <ActionButtons />,
        ].map((block) => (
            <SC.Container>{block}</SC.Container>
        ))}
    </>
);

export default ProductInfo;
