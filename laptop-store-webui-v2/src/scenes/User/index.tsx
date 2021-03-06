import React, { memo, useMemo, useState } from "react";
import {
    FaAddressBook,
    FaBoxes,
    FaHeart,
    FaInfoCircle,
    FaLock,
    FaTrophy,
    FaTruckLoading,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import EmptyBlock from "../../components/EmptyBlock";
import MenuBar from "../../components/MenuBar";
import { RootState } from "../../services/redux/rootReducer";
import MenuItemProps from "../../values/props/MenuItemProps";
import AddressDetail from "./scenes/AddressDetail";
import AddressPage from "./scenes/AddressPage";
import InfoPage from "./scenes/InfoPage";
import MilestonePage from "./scenes/MilestonePage";
import OrderDetail from "./scenes/OrderDetail";
import OrderPage from "./scenes/OrderPage";
import PasswordPage from "./scenes/PasswordPage";
import WishListPage from "./scenes/WishListPage";
import { SC } from "./styles";

const User = () => {
    const [title, setTitle] = useState<string | null>(null);
    const { isLoading, isFetching } = useSelector((state: RootState) => state.loaderStatus);

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
                link: "/user/milestones",
                title: "Cột mốc",
            },
        ],
        []
    );

    const routes = useMemo(
        () => [
            {
                path: "/user/info",
                title: "Thông tin",
                component: <InfoPage />,
            },
            {
                path: "/user/addresses",
                title: "Sổ địa chỉ",
                component: <AddressPage />,
            },
            {
                path: "/user/addresses/create",
                title: "Tạo địa chỉ",
                component: <AddressDetail />,
            },
            {
                path: "/user/addresses/edit/:addressId",
                title: "Cập nhật địa chỉ",
                component: <AddressDetail />,
            },
            {
                path: "/user/password",
                title: "Đổi mật khẩu",
                component: <PasswordPage />,
            },
            {
                path: "/user/orders",
                title: "Danh sách đơn hàng",
                component: <OrderPage />,
            },
            {
                path: "/user/orders/:orderId",
                title: "Chi tiết đơn hàng",
                component: <OrderDetail />,
            },
            {
                path: "/user/wish-list",
                title: "Danh sách xem sau",
                component: <WishListPage />,
            },
            {
                path: "/user/milestones",
                title: "Cột mốc",
                component: <MilestonePage />,
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
                {isFetching ? (
                    <SC.LoaderContainer>
                        <EmptyBlock icon={<FaTruckLoading />} title="Đang tải thông tin" />
                    </SC.LoaderContainer>
                ) : null}
                <SC.ContentContainer
                    className={`${isLoading ? (isFetching ? "fetching" : "loading") : undefined}`}
                >
                    <Switch>
                        {routes.map((route) => (
                            <Route
                                exact
                                path={route.path}
                                render={() => {
                                    setTitle(route.title);
                                    return route.component;
                                }}
                            />
                        ))}
                    </Switch>
                </SC.ContentContainer>
            </SC.RightContainer>
        </SC.Container>
    );
};

export default memo(User);
