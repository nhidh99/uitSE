import React from "react";
import ProductInfo from "./components/ProductInfo";
import ProductImages from "./components/ProductImages";
import { SC } from "./styles";

const OverviewBlock = () => (
    <SC.OuterContainer>
        <SC.LeftContainer>
            <ProductImages />
        </SC.LeftContainer>

        <SC.RightContainer>
            <ProductInfo />
        </SC.RightContainer>
    </SC.OuterContainer>
);

export default OverviewBlock;
