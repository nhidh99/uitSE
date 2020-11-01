/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from "react";
import ProductHeader from "./components/ProductHeader";
import ProductSearch from "./components/ProductSearch";
import ProductTable from "./components/ProductTable";

const ProductPage = () => (
    <>
        <ProductHeader />
        <ProductSearch />
        <ProductTable />
    </>
);

export default memo(ProductPage);
