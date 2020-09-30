/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { fetchOrderById } from "../../../../services/redux/slices/orderSlice";
import store from "../../../../services/redux/store";

const OrderDetail = () => {
    // @ts-ignore
    const { orderId } = useParams();

    useEffect(() => {
        store.dispatch(fetchOrderById(parseInt(orderId)));
        console.log(store.getState().order);
    }, []);

    return <div>Order Detail</div>;
};

export default OrderDetail;
