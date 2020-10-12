import React, { useMemo } from "react";
import { FaAddressBook, FaBoxes, FaHeart, FaInfoCircle, FaLock, FaTrophy } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import Loader from "../../components/Loader";
import MenuBar from "../../components/MenuBar";
import { RootState } from "../../services/redux/rootReducer";
import { setMenuTitle } from "../../services/redux/slices/menuTitleSlice";
import store from "../../services/redux/store";
import MenuItemProps from "../../values/props/MenuItemProps";
import AddressDetail from "./scenes/AddressDetail";
import AddressPage from "./scenes/AddressPage";
import InfoPage from "./scenes/InfoPage";
import OrderDetail from "./scenes/OrderDetail";
import OrderPage from "./scenes/OrderPage";
import PasswordPage from "./scenes/PasswordPage";
import WishListPage from "./scenes/WishListPage";
import { SC } from "./styles";

const User = () => {
    const title = useSelector((state: RootState) => state.menuTitle);
    const loaderStatus = useSelector((state: RootState) => state.loaderStatus);

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
            <SC.LeftContainer>
                <MenuBar items={items} />
            </SC.LeftContainer>
            <SC.RightContainer>
                <SC.TitleContainer>{title}</SC.TitleContainer>
                <SC.LoaderContainer>
                    <Loader loading={loaderStatus.isLoading} loadOnce={loaderStatus.isFetching} />
                    <SC.ContentContainer
                        style={{ display: loaderStatus.isFetching ? "none" : "inherit" }}
                    >
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
                                    store.dispatch(setMenuTitle("Danh sách đơn hàng"));
                                    return <OrderPage />;
                                }}
                            />

                            <Route
                                exact
                                path="/user/orders/:orderId"
                                render={() => {
                                    store.dispatch(setMenuTitle("Chi tiết đơn hàng"));
                                    return <OrderDetail />;
                                }}
                            />

                            <Route
                                exact
                                path="/user/wish-list"
                                render={() => {
                                    store.dispatch(setMenuTitle("Danh sách xem sau"));
                                    return <WishListPage />;
                                }}
                            />
                        </Switch>
                    </SC.ContentContainer>
                </SC.LoaderContainer>
            </SC.RightContainer>
        </SC.Container>
    );
};

export default User;
