import React from "react";
import ItemCategory from "./components/ItemCategory";

const HomePage = () => (
    <>
        <ItemCategory title="LAPTOP GIẢM GIÁ TỐT" category="discount" />
        <ItemCategory title="LAPTOP BÁN CHẠY" category="best-selling" />
        <ItemCategory title="LAPTOP MỚI" category="latest" />
        <ItemCategory title="LAPTOP GIÁ RẺ" category="cheap" />
    </>
);

export default HomePage;
