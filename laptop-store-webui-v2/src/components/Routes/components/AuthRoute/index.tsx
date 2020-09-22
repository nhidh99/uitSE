import React from "react";
import { Route } from "react-router";
import Auth from "../../../../scenes/Auth";

const AuthRoute = () => (
    <Route exact component={Auth} path="/auth/(forgot|login|register)" />
);

export default AuthRoute;
