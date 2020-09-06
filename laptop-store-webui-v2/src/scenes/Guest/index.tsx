import React from "react";
import { Switch, Route } from "react-router";
import HomePage from "./scenes/HomePage";
import DetailPage from "./scenes/DetailPage";

const Guest = () => (
    <Switch>
        <Route exact component={HomePage} path="/" />
        <Route
            exact
            path={["/products/:productId", "/products/:alt/:productId"]}
            component={DetailPage}
        />
    </Switch>
);

export default Guest;
