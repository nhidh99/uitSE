import React from "react";
import { Switch, Route } from "react-router";
import HomePage from "./scenes/HomePage";
import DetailPage from "./scenes/DetailPage";
import ComparePage from "./scenes/ComparePage";

const Guest = () => (
    <Switch>
        <Route exact component={HomePage} path="/" />
        <Route
            exact
            path="/products/:productAlt/:productId"
            component={DetailPage}
        />
        <Route
            exact
            path="/compare/:alt1-vs-:alt2/:id1/:id2"
            component={ComparePage}
        />
    </Switch>
);

export default Guest;
