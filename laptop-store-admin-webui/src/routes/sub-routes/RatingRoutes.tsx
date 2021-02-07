import { PATHS } from "@/constants/paths";
import RatingList from "@/pages/Home/pages/RatingList/RatingList";
import React, { memo } from "react";
import { Switch } from "react-router-dom";
import AuthenticatedGuard from "../AuthenticatedGuard";

function RatingRoutes() {
    return (
        <Switch>
            <AuthenticatedGuard exact path={PATHS.RATINGS} component={RatingList} />
        </Switch>
    );
}

export default memo(RatingRoutes);
