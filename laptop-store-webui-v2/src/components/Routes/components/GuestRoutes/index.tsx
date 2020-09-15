import React from "react";
import { Route } from "react-router";
import Guest from "../../../../scenes/Guest";

const GuestRoutes = () => (
    <Route
        exact
        component={Guest}
        path={[
            "/",
            "/search",
            "/cart",
            "/products/:alt/:id",
            "/compare/:alt/:id1/:id2",
        ]}
    />
);

export default GuestRoutes;
