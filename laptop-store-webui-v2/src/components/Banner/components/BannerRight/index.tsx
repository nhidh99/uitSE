import React from "react";
import NavItem from "./components/NavItem";
import { FaEdit, FaUser, FaBoxes } from "react-icons/fa";
import { SC } from "./styles";
import CartItem from "./components/CartItem";

const BannerRight = () => {
    return (
        <SC.NavBar>
            <ul>
                <NavItem href="/admin/orders" icon={FaEdit} title="Quản lí" />
                <NavItem href="/user/orders" icon={FaBoxes} title="Đơn hàng" />
                <CartItem />
                <NavItem href="/user/info" icon={FaUser} title="Tài khoản" />
                <NavItem href="/auth/login" icon={FaUser} title="Đăng nhập" />
            </ul>
        </SC.NavBar>
    );
};

export default BannerRight;
