import React from "react";
import { RoleType } from "../../constants";
import GuestRoutes from "./components/GuestRoutes";
import UserRoutes from "./components/UserRoutes";
import AdminRoutes from "./components/AdminRoutes";

type RoutesProps = {
    role: string;
};

const Routes = ({ role }: RoutesProps) => {
    switch (role) {
        case RoleType.GUEST:
            return <GuestRoutes />;
        case RoleType.USER:
            return <UserRoutes />;
        case RoleType.ADMIN:
            return <AdminRoutes />;
        default:
            return null;
    }
};

export default Routes;
