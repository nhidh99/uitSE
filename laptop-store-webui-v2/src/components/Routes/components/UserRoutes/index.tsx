import React, { Fragment } from "react";
import { Route } from "react-router";
import Guest from "../../../../scenes/Guest";
import User from "../../../../scenes/User";

const UserRoutes = () => (
    <Fragment>
        <Route
            exact
            component={Guest}
            path={[
                "/",
                "/search",
                "/cart",
                "/payment",
                "/compare/:alt/:id1/:id2",
                "/products/:alt/:id",
            ]}
        />

        <Route
            exact
            component={User}
            path={[
                "/user/(info|password|addresses|orders|wish-list|rewards)",
                "/user/addresses/:id",
                "/user/orders/:id",
            ]}
        />
    </Fragment>
);

export default UserRoutes;
