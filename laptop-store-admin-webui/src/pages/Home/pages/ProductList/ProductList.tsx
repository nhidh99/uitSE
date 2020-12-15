import productAPI from "@/services/api/productAPI";
import React from "react";
import ProductItems from "./components/ProductItems";
import ProductTable from "./components/ProductTable";
import ItemList from "../../components/ItemList";
import ProductToolbar from "./components/ProductToolbar";

function ProductList() {
    return (
        <ItemList
            toolbar={<ProductToolbar />}
            mobileVersion={<ProductItems />}
            desktopVersion={<ProductTable />}
            fetchAPI={productAPI.getByPage}
        />
    );
}

export default ProductList;
