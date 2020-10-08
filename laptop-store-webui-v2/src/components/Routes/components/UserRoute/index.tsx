import React from "react";
import { Route } from "react-router";
import User from "../../../../scenes/User";
import CheckoutPage from "../../../../scenes/User/scenes/CheckoutPage";

const UserRoute = () => (
    <>
        <Route
            exact
            component={User}
            path={[
                "/user/(info|password|addresses|orders|wish-list|rewards)",
                "/user/addresses/create",
                "/user/addresses/edit/:addressId",
                "/user/orders/:id",
                "/user/checkout",
            ]}
        />

        <Route exact component={CheckoutPage} path="/checkout" />
    </>
);

export default UserRoute;
