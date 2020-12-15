import React from "react";
import ItemList from "../../components/ItemList";
import OrderItems from "./components/OrderItems";
import OrderTable from "./components/OrderTable";
import OrderToolbar from "./components/OrderToolbar";
import orderAPI from '@/services/api/orderAPI';

function OrderList() {
    return (
        <ItemList
            toolbar={<OrderToolbar />}
            mobileVersion={<OrderItems />}
            desktopVersion={<OrderTable />}
            fetchAPI={orderAPI.getByPage}
        />
    );
}

export default OrderList;
