import React from "react";
import GuestRoutes from "./components/GuestRoutes";
import UserRoutes from "./components/UserRoutes";
import AdminRoutes from "./components/AdminRoutes";
import AuthRoutes from "./components/AuthRoutes";
import store from "../../services/redux/store";
import RoleConstants from "../../values/constants/RoleConstants";

type RoutesProps = {
    role: string;
};

const Routes = () => {
    const role = store.getState()["user"]?.role ?? RoleConstants.GUEST;
    switch (role) {
        case RoleConstants.GUEST:
            return (
                <>
                    <GuestRoutes />
                    <AuthRoutes />
                </>
            );
        case RoleConstants.USER:
            return <UserRoutes />;
        case RoleConstants.ADMIN:
            return <AdminRoutes />;
        default:
            return null;
    }
};

export default Routes;
