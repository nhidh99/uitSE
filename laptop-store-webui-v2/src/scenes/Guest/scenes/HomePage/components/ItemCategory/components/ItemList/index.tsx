/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import laptopApi from "../../../../../../../../services/api/laptopApi";
import EmptyItem from "./components/EmptyItem";
import MoreButton from "./components/MoreButton";
import LaptopItem from "./components/LaptopItem";
// import store from "../../../../../../../../services/redux/store";
// import { buildErrorModal } from "../../../../../../../../services/redux/actions";

type ItemListProps = {
    category: string;
};

const ItemList = ({ category }: ItemListProps) => {
    const INITIAL_STATE = {
        page: 1,
        products: Array<any>(),
        loading: true,
        fetching: true,
        isDone: false,
    };
    const [state, setState] = useState(INITIAL_STATE);
    const { products, loading, fetching, page, isDone } = state;

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await laptopApi.getByCategory(category, page);
                const length = parseInt(response.headers["x-total-count"]);
                const newProducts = [...products, ...response.data];
                setState((prev) => ({
                    ...prev,
                    products: newProducts,
                    fetching: false,
                    isDone: newProducts.length === length,
                    loading: false,
                }));
            } catch (err) {
                setState((prev) => ({
                    ...prev,
                    isDone: true,
                    fetching: false,
                }));
                // store.dispatch(buildErrorModal());
            }
        };
        loadData();
    }, [page]);

    return loading ? (
        <Fragment>
            {[...Array(10)].map((_) => (
                <EmptyItem />
            ))}
        </Fragment>
    ) : (
        <Fragment>
            {products.map((product) => {
                return <LaptopItem key={product["id"]} product={product} />;
            })}
            <MoreButton
                show={!isDone}
                disabled={fetching}
                onClick={() =>
                    setState((prev) => ({
                        ...prev,
                        fetching: true,
                        page: page + 1,
                    }))
                }
            />
        </Fragment>
    );
};

export default ItemList;
