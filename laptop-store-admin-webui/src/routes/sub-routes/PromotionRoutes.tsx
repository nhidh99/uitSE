import { PATHS } from "@/constants/paths";
import PromotionList from "@/pages/Home/pages/PromotionList/PromotionList";
import React, { memo } from "react";
import { Switch } from "react-router-dom";
import AuthenticatedGuard from "../AuthenticatedGuard";

function ProductRoutes() {
    return (
        <Switch>
            <AuthenticatedGuard exact path={PATHS.PROMOTIONS} component={PromotionList} />
        </Switch>
    );
}

export default memo(ProductRoutes);
