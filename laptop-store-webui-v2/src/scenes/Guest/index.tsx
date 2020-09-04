import React from "react";
import { Switch, Route } from "react-router";
import HomePage from "./scenes/HomePage";

const Guest = () => (
    <Switch>
        <Route exact component={HomePage} path="/" />
    </Switch>
);

export default Guest;
