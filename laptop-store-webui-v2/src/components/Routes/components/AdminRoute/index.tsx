import React from "react";
import { Route } from "react-router";
import Admin from "../../../../scenes/Admin";

const AdminRoute = () => (
    <Route
        exact
        component={Admin}
        path={["/admin/(|products|orders|promotions|ratings|comments|replies)"]}
    />
);

export default AdminRoute;
