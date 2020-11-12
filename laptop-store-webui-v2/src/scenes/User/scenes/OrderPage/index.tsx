/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaBoxes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
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
import queryString from "query-string";

type OrderPageState = {
    orders: OrderOverviewModel[] | null;
    orderCount: number;
};

const OrderPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const page = useRef<number>(0);

    const initialState = useMemo<OrderPageState>(
        () => ({
            orders: null,
            orderCount: 0,
        }),
        []
    );

    const [state, setState] = useState<OrderPageState>(initialState);
    const { orders, orderCount } = state;

    useEffect(() => {
        const loadData = async () => {
            window.scroll({ top: 0, behavior: "smooth" });
            dispatch(orders ? fireLoading() : fireFetching());

            // @ts-ignore
            page.current =
                queryString.parse(location.search, { parseNumbers: true })?.["page"] ?? 1;

            // @ts-ignore
            const response = await userApi.getCurrentUserOrders(page.current);
            setState((prev) => ({
                ...prev,
                orders: response.data,
                orderCount: parseInt(response.headers["x-total-count"]),
            }));

            dispatch(skipFetching());
        };

        loadData();
    }, [location.search]);

    return orders ? (
        <>
            {orderCount === 0 ? (
                <EmptyBlock icon={<FaBoxes />} title="Danh sách đơn hàng trống" paddingless />
            ) : (
                <>
                    {orders.map((order) => (
                        <OrderBlock order={order} />
                    ))}
                    <Paginate count={orderCount} initialPage={page.current} sizePerPage={5} />
                </>
            )}
        </>
    ) : null;
};

export default OrderPage;
