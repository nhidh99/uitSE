import React, { Fragment } from "react";
import { Route } from "react-router";
import User from "../../../../scenes/User";

const UserRoute = () => (
    <Route
        exact
        component={User}
        path={[
            "/user/(info|password|addresses|orders|wish-list|rewards)",
            "/user/addresses/create",
            "/user/addresses/edit/:addressId",
            "/user/orders/:id",
        ]}
    />
);

export default UserRoute;
