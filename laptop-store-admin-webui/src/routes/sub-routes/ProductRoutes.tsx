import { PATHS } from "@/constants/paths";
import ProductList from "@/pages/Home/pages/ProductList/ProductList";
import React, { memo } from "react";
import { Switch } from "react-router-dom";
import AuthenticatedGuard from "../AuthenticatedGuard";

function ProductRoutes() {
    return (
        <Switch>
            <AuthenticatedGuard exact path={PATHS.PRODUCTS} component={ProductList} />
        </Switch>
    );
}

export default memo(ProductRoutes);
