import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import userApi from "../../../../services/api/userApi";
import OrderOverviewModel from "../../../../values/models/OrderOverviewModel";
import OrderBlock from "./components/OrderBlock";
import { SC } from "./styles";

type OrderPageState = {
    loading: boolean;
    orders: OrderOverviewModel[] | null;
};

const OrderPage = () => {
    const initialState = useMemo<OrderPageState>(
        () => ({
            loading: true,
            orders: null,
        }),
        []
    );

    const [state, setState] = useState<OrderPageState>(initialState);
    const { loading, orders } = state;

    useEffect(() => {
        const loadData = async () => {
            const response = await userApi.getCurrentUserOrders(1);
            setState({ loading: false, orders: response.data });
        };
        loadData();
    }, []);

    const pageChange = useCallback((page: { selected: number }) => {
        setState((prev) => ({ ...prev, loading: true }));
    }, []);

    return orders ? (
        <>
            {orders.map((order) => (
                <OrderBlock order={order} />
            ))}
            <SC.PaginateContainer>
                <ReactPaginate
                    pageCount={10}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    previousLabel={<FaArrowLeft />}
                    nextLabel={<FaArrowRight />}    
                    onPageChange={pageChange}
                />
            </SC.PaginateContainer>
        </>
    ) : null;
};

export default OrderPage;
