import React, { Fragment } from "react";
import { Route } from "react-router";
import Guest from "../../../../scenes/Guest";
import Admin from "../../../../scenes/Admin";
import User from "../../../../scenes/User";

const AdminRoutes = () => (
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
                "/products/:id",
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

        <Route
            exact
            component={Admin}
            path={[
                "/admin/(|products|orders|promotions|ratings|comments)",
                "/admin/products/search",
                "/admin/orders/search",
                "/admin/promotions/search",
                "/admin/ratings/search",
                "/admin/comments/search",
            ]}
        />
    </Fragment>
);

export default AdminRoutes;
