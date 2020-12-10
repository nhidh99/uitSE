import React from "react";
import ProductTable from "./components/ProductTable";
import ProductToolbar from "./components/ProductToolbar";

function ProductList() {
    return (
        <>
            <ProductToolbar />
            <ProductTable />
        </>
    );
}

export default ProductList;
