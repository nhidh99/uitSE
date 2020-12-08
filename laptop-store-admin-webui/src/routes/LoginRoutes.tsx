import { PATHS } from "@/constants/paths";
import Login from "@/pages/Login/Login";
import React, { memo } from "react";
import { Switch, Route } from "react-router-dom";

function LoginRoutes() {
    return (
        <Switch>
            <Route exact path={PATHS.LOGIN} render={() => <Login />} />
        </Switch>
    );
}

export default memo(LoginRoutes);
