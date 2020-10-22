/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaBoxes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import EmptyBlock from "../../../../components/EmptyBlock";
import Paginate from "../../../../components/Paginate";
import userApi from "../../../../services/api/userApi";
import {
    fireFetching,
    fireLoading,
    skipFetching,
} from "../../../../services/redux/slices/loaderStatusSlice";
import OrderOverviewModel from "../../../../values/models/OrderOverviewModel";
import OrderBlock from "./components/OrderBlock";

type OrderPageState = {
    orders: OrderOverviewModel[] | null;
    orderCount: number;
    page: number;
};

const OrderPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const initialState = useMemo<OrderPageState>(
        () => ({
            orders: null,
            orderCount: 0,
            page: parseInt(
                new URLSearchParams(window.location.search)?.get("page") ?? "1"
            ),
        }),
        []
    );

    const [state, setState] = useState<OrderPageState>(initialState);
    const { orders, orderCount, page } = state;

    useEffect(() => {
        const loadData = async () => {
            dispatch(orders ? fireLoading() : fireFetching());
            history.push(`/user/orders?page=${page}`);
            const response = await userApi.getCurrentUserOrders(page);
            setState((prev) => ({
                ...prev,
                orders: response.data,
                orderCount: parseInt(response.headers["x-total-count"]),
            }));
            dispatch(skipFetching());
        };
        loadData();
    }, [page]);

    const pageChange = useCallback((data: { selected: number }) => {
        setState((prev) => ({ ...prev, page: data.selected + 1 }));
    }, []);

    return orders ? (
        <>
            {orderCount === 0 ? (
                <EmptyBlock
                    icon={<FaBoxes />}
                    title="Danh sách đơn hàng trống"
                    borderless
                />
            ) : (
                <>
                    {orders.map((order) => (
                        <OrderBlock order={order} />
                    ))}
                    <Paginate
                        count={orderCount}
                        initialPage={page}
                        pageChange={pageChange}
                    />
                </>
            )}
        </>
    ) : null;
};

export default OrderPage;
