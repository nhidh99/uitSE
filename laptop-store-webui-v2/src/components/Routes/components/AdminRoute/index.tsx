import React from "react";
import { Route } from "react-router";
import Admin from "../../../../scenes/Admin";

const AdminRoute = () => (
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
);

export default AdminRoute;
