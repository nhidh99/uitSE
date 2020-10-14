import React from "react";
import ItemCategory from "./components/ItemCategory";
import ItemFilter from "./components/ItemFilter";
import { SC } from "./styles";

const HomePage = () => (
    <SC.Container>
        <SC.LeftContainer>
            <ItemFilter />
        </SC.LeftContainer>
        <SC.RightContainer>
            <ItemCategory title="LAPTOP GIẢM GIÁ TỐT" category="discount" />
            <ItemCategory title="LAPTOP BÁN CHẠY" category="best-selling" />
            <ItemCategory title="LAPTOP MỚI" category="latest" />
            <ItemCategory title="LAPTOP GIÁ RẺ" category="cheap" />
        </SC.RightContainer>
    </SC.Container>
);

export default HomePage;
