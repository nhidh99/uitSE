import React from "react";
import GuestRoute from "./components/GuestRoute";
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";
import AuthRoute from "./components/AuthRoute";
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
                    <GuestRoute />
                    <AuthRoute />
                </>
            );
        case RoleConstants.USER:
            return (
                <>
                    <UserRoute />
                    <GuestRoute />
                </>
            );
        case RoleConstants.ADMIN:
            return (
                <>
                    <AdminRoute/>
                    <UserRoute />
                    <GuestRoute />
                </>
            );
        default:
            return null;
    }
};

export default Routes;
