/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from "react";
import SearchForm from "../components/SearchForm";
import ProductHeader from "./components/ProductHeader";
import ProductTable from "./components/ProductTable";

const ProductPage = () => (
    <>
        <ProductHeader />
        <SearchForm placeholder="Tìm kiếm theo mã hoặc tên sản phẩm" />
        <ProductTable />
    </>
);

export default memo(ProductPage);
