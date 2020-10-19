/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import laptopApi from "../../../../../../../../services/api/laptopApi";
import LaptopItem from "../../../../../../../../components/LaptopItem";
import ProductOverviewModel from "../../../../../../../../values/models/ProductSummaryModel";
import EmptyItem from "../EmptyItem";
import MoreButton from "../MoreButton";
import { useHistory } from "react-router";

type ItemListProps = {
    category: string;
};

type ItemListState = {
    page: number;
    products: ProductOverviewModel[];
    loading: boolean;
    fetching: boolean;
    isDone: boolean;
};

const ItemList = ({ category }: ItemListProps) => {
    const initialState = useMemo<ItemListState>(
        () => ({
            page: 1,
            products: [],
            loading: true,
            fetching: true,
            isDone: false,
        }),
        []
    );

    const history = useHistory();
    const [state, setState] = useState<ItemListState>(initialState);
    const { products, loading, fetching, page, isDone } = state;

    useEffect(() => {
        if (!fetching) return;
        const loadData = async () => {
            try {
                let response;
                switch (category) {
                    case "filter": {
                        const url = `laptops/filter${window.location.search}&page=${page}`;
                        response = await laptopApi.getByFilter(url);
                        break;
                    }
                    case "search": {
                        const params = new URLSearchParams(window.location.search);
                        const name = params.get("name");
                        const sort = params?.get("sort") ?? "best_selling";
                        if (name !== null) {
                            response = await laptopApi.getByName(name, sort, page);
                        } else {
                            history.push("/");
                            return;
                        }
                        break;
                    }
                    default: {
                        response = await laptopApi.getByCategory(category, page);
                        break;
                    }
                }

                const length = parseInt(response.headers["x-total-count"]);
                const newProducts = [...products, ...response.data];
                setState((prev) => ({
                    ...prev,
                    products: newProducts,
                    fetching: false,
                    loading: false,
                    isDone: newProducts.length === length,
                    page: page + 1,
                }));
            } catch (err) {
                setState((prev) => ({
                    ...prev,
                    isDone: true,
                    fetching: false,
                }));
            }
        };
        loadData();
    }, [fetching]);

    const loadMore = useCallback(() => {
        setState((prev) => ({
            ...prev,
            fetching: true,
        }));
    }, []);

    return loading ? (
        <>
            {[...Array(12)].map((_) => (
                <EmptyItem />
            ))}
        </>
    ) : (
        <>
            {products.map((product) => {
                return <LaptopItem key={product["id"]} product={product} />;
            })}
            <MoreButton show={!isDone} disabled={fetching} onClick={loadMore} />
        </>
    );
};

export default ItemList;
