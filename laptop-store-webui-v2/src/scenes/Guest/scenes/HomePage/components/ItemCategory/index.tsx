/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useHistory } from "react-router";
import { FaLaptop, FaTruckLoading } from "react-icons/fa";
import ProductOverviewModel from "../../../../../../values/models/ProductSummaryModel";
import laptopApi from "../../../../../../services/api/laptopApi";
import EmptyItem from "./components/EmptyItem";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import SortFilter from "./components/SortFilter";
import LaptopItem from "../../../../../../components/LaptopItem";
import MoreButton from "./components/MoreButton";
import { SC } from "./styles";

type ItemListProps = {
    category: string;
    title: string;
};

type ItemListState = {
    page: number;
    products: ProductOverviewModel[];
    loading: boolean;
    fetching: boolean;
    isDone: boolean;
    length: number;
};

const ItemCategory = ({ category, title }: ItemListProps) => {
    const initialState = useMemo<ItemListState>(
        () => ({
            page: 1,
            products: [],
            loading: true,
            fetching: true,
            isDone: false,
            length: 0,
        }),
        []
    );

    const history = useHistory();
    const [state, setState] = useState<ItemListState>(initialState);
    const { products, loading, fetching, page, isDone, length } = state;

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
                    length: length,
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

    return (
        <SC.OuterContainer>
            <SC.Header>
                {title}
                {["filter", "search"].includes(category) && !loading && products.length ? (
                    <>
                        {` (${length} sản phẩm)`} <SortFilter />
                    </>
                ) : null}
            </SC.Header>

            {loading ? (
                ["filter", "search"].includes(category) ? (
                    <EmptyBlock
                        icon={<FaTruckLoading />}
                        title="Đang tìm kiếm sản phẩm"
                    />
                ) : (
                    <SC.ItemContainer>
                        {[...Array(12)].map((_) => (
                            <EmptyItem />
                        ))}
                    </SC.ItemContainer>
                )
            ) : products.length === 0 ? (
                <EmptyBlock icon={<FaLaptop />} title="Không tìm thấy sản phẩm phù hợp" />
            ) : (
                <SC.ItemContainer>
                    {products.map((product) => {
                        return <LaptopItem key={product["id"]} product={product} />;
                    })}
                    <MoreButton show={!isDone} disabled={fetching} onClick={loadMore} />
                </SC.ItemContainer>
            )}
        </SC.OuterContainer>
    );
};

export default memo(ItemCategory);
