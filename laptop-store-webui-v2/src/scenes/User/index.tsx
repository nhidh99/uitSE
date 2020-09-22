import React, { useMemo } from "react";
import {
    FaAddressBook,
    FaBoxes,
    FaHeart,
    FaInfoCircle,
    FaLock,
    FaTrophy,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router";
import MenuBar from "../../components/MenuBar";
import { RootState } from "../../services/redux/rootReducer";
import { setMenuTitle } from "../../services/redux/slices/menuTitleSlice";
import store from "../../services/redux/store";
import MenuItemProps from "../../values/props/MenuItemProps";
import AddressDetail from "./scenes/AddressDetail";
import AddressPage from "./scenes/AddressPage";
import InfoPage from "./scenes/InfoPage";
import OrderPage from "./scenes/OrderPage";
import PasswordPage from "./scenes/PasswordPage";
import { SC } from "./styles";

const User = () => {
    const title = useSelector((state: RootState) => state.menuTitle);

    const items: MenuItemProps[] = useMemo(
        () => [
            {
                icon: FaInfoCircle,
                link: "/user/info",
                title: "Thông tin",
            },
            {
                icon: FaAddressBook,
                link: "/user/addresses",
                title: "Sổ địa chỉ",
            },
            {
                icon: FaLock,
                link: "/user/password",
                title: "Mật khẩu",
            },
            {
                icon: FaBoxes,
                link: "/user/orders",
                title: "Đơn hàng",
            },
            {
                icon: FaHeart,
                link: "/user/wish-list",
                title: "Xem sau",
            },
            {
                icon: FaTrophy,
                link: "/user/rewards",
                title: "Cột mốc",
            },
        ],
        []
    );

    return (
        <SC.Container>
            <MenuBar items={items} />
            <SC.RightContainer>
                <SC.TitleContainer>{title}</SC.TitleContainer>
                <SC.ContentContainer>
                    <Switch>
                        <Route
                            exact
                            path="/user/info"
                            render={() => {
                                store.dispatch(setMenuTitle("Thông tin"));
                                return <InfoPage />;
                            }}
                        />

                        <Route
                            exact
                            path="/user/addresses"
                            render={() => {
                                store.dispatch(setMenuTitle("Sổ địa chỉ"));
                                return <AddressPage />;
                            }}
                        />

                        <Route
                            exact
                            path="/user/addresses/create"
                            render={() => {
                                store.dispatch(setMenuTitle("Tạo địa chỉ"));
                                return <AddressDetail />;
                            }}
                        />

                        <Route
                            exact
                            path="/user/addresses/edit/:addressId"
                            render={() => {
                                store.dispatch(setMenuTitle("Cập nhật địa chỉ"));
                                return <AddressDetail />;
                            }}
                        />

                        <Route
                            exact
                            path="/user/password"
                            render={() => {
                                store.dispatch(setMenuTitle("Đổi mật khẩu"));
                                return <PasswordPage />;
                            }}
                        />

                        <Route
                            exact
                            path="/user/orders"
                            render={() => {
                                store.dispatch(
                                    setMenuTitle("Danh sách đơn hàng")
                                );
                                return <OrderPage />;
                            }}
                        />
                    </Switch>
                </SC.ContentContainer>
            </SC.RightContainer>
        </SC.Container>
    );
};

export default User;
