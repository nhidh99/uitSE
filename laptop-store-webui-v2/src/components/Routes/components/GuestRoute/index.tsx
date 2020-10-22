import React from "react";
import { Route } from "react-router";
import Guest from "../../../../scenes/Guest";

const GuestRoute = () => (
    <Route
        exact
        component={Guest}
        path={[
            "/",
            "/search",
            "/filter",
            "/cart",
            "/products/:alt/:id",
            "/compare/:alt/:id1/:id2",
        ]}
    />
);

export default GuestRoute;
