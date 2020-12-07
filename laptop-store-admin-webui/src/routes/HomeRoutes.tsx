import SideBar from "@/components/SideBar";
import { PATH } from "@/constants/paths";
import Home from "@/pages/Home/Home";
import React, { memo } from "react";
import { Switch } from "react-router-dom";
import AuthenticatedGuard from "./AuthenticatedGuard";

function HomeRoutes() {
    return (
        <Switch>
            <AuthenticatedGuard exact path={[PATH.PRODUCT]} component={SideBar} />
            <AuthenticatedGuard exact path={PATH.PRODUCT} component={Home} />
        </Switch>
    );
}

export default memo(HomeRoutes);
