import React, { Fragment } from "react";
import { Route } from "react-router";
import Guest from "../../../../scenes/Guest";
import Auth from "../../../../scenes/Auth";

const GuestRoutes = () => (
    <Fragment>
        <Route
            exact
            component={Guest}
            path={[
                "/",
                "/search",
                "/cart",
                "/products/:id",
                "/products/:alt/:id",
                "/compare/:alt/:id1/:id2",
            ]}
        />
        <Route exact component={Auth} path="/auth/(forgot|login|register)" />
    </Fragment>
);

export default GuestRoutes;
