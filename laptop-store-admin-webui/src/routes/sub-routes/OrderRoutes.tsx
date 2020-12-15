import { PATHS } from "@/constants/paths";
import OrderList from "@/pages/Home/pages/OrderList/OrderList";
import React, { memo } from "react";
import { Switch } from "react-router-dom";
import AuthenticatedGuard from "../AuthenticatedGuard";

function OrderRoutes() {
    return (
        <Switch>
            <AuthenticatedGuard exact path={PATHS.ORDERS} component={OrderList} />
        </Switch>
    );
}

export default memo(OrderRoutes);
