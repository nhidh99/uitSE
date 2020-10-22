import React from "react";
import { Route, Switch } from "react-router";
import LoginPage from "./scenes/LoginPage";
import RegisterPage from "./scenes/RegisterPage";
import { SC } from "./styles";

const Auth = () => (
    <SC.Container>
        <Switch>
            <Route exact component={LoginPage} path="/auth/login" />
            <Route exact component={RegisterPage} path="/auth/register"/>
        </Switch>
    </SC.Container>
);

export default Auth;
