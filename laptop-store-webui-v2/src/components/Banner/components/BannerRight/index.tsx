import React from "react";
import NavItem from "./components/NavItem";
import { FaEdit, FaUser, FaBoxes } from "react-icons/fa";
import { SC } from "./styles";
import RoleConstants from "../../../../values/constants/RoleConstants";
import NavCart from "./components/NavCart";

const BannerRight = () => (
    <SC.NavBar>
        <ul>
            <NavItem
                href="/admin/orders"
                icon={FaEdit}
                title="Quản lí"
                allowedRoles={[RoleConstants.ADMIN]}
            />

            <NavItem
                href="/user/orders"
                icon={FaBoxes}
                title="Đơn hàng"
                allowedRoles={[RoleConstants.ADMIN, RoleConstants.USER]}
            />

            <NavCart />

            <NavItem
                href="/user/info"
                icon={FaUser}
                title="Tài khoản"
                allowedRoles={[RoleConstants.ADMIN, RoleConstants.USER]}
            />

            <NavItem
                href="/auth/login"
                icon={FaUser}
                title="Đăng nhập"
                allowedRoles={[RoleConstants.GUEST]}
            />
        </ul>
    </SC.NavBar>
);

export default BannerRight;
