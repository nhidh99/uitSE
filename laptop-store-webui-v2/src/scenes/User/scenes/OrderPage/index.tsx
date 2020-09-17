import React, { useEffect, useState } from "react";
import Spinner from "../../../../components/Spinner";
import userApi from "../../../../services/api/userApi";
import OrderOverviewModel from "../../../../values/models/OrderOverviewModel";
import OrderBlock from "./components/OrderBlock";

const OrderPage = () => {
    const [orders, setOrders] = useState<OrderOverviewModel[] | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const response = await userApi.getCurrentUserOrders(1);
            setOrders(response.data);
        };
        loadData();
    }, []);

    return orders ? (
        <>
            {orders.map((order) => (
                <OrderBlock order={order} />
            ))}
        </>
    ) : (
        <Spinner />
    );
};

export default OrderPage;
