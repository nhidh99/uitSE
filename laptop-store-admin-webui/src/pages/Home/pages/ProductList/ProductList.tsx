import productAPI from "@/services/api/productAPI";
import useListFetch from "@/services/hooks/useListFetch";
import useWindowSize from "@/services/hooks/useWindowSize";
import ProductItemModel from "@/types/model/ProductItemModel";
import React from "react";
import ProductItems from "./components/ProductItems";
import ProductTable from "./components/ProductTable";
import ProductToolbar from "./components/ProductToolbar";
import Paginate from "../../components/Paginate";
import Loader from "@/components/Loader";

function ProductList() {
    const { isMobile } = useWindowSize();
    const { list, count, page, loading, firstLoad } = useListFetch<ProductItemModel>(
        productAPI.getByPage
    );

    return firstLoad ? (
        <Loader />
    ) : (
        <>
            <ProductToolbar />

            {isMobile ? <ProductItems list={list} /> : <ProductTable list={list} />}

            <Paginate
                initialPage={page || 1}
                sizePerPage={10}
                totalCount={count}
                disabled={loading}
            />
        </>
    );
}

export default ProductList;
