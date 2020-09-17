import React, { useMemo } from "react";
import {
    FaAddressBook,
    FaBoxes,
    FaHeart,
    FaInfoCircle,
    FaLock,
    FaTrophy,
} from "react-icons/fa";
import { Route, Switch } from "react-router";
import MenuBar from "../../components/MenuBar";
import MenuItemProps from "../../values/props/MenuItemProps";
import AddressPage from "./scenes/AddressPage";
import InfoPage from "./scenes/InfoPage";
import OrderPage from "./scenes/OrderPage";
import PasswordPage from "./scenes/PasswordPage";
import { SC } from "./styles";

const User = () => {
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

    const title = items.find((item) =>
        window.location.pathname.includes(item.link)
    )?.title;

    return (
        <SC.Container>
            <MenuBar items={items} />
            <SC.RightContainer>
                <SC.TitleContainer>{title}</SC.TitleContainer>
                <SC.ContentContainer>
                    <Switch>
                        <Route exact component={InfoPage} path="/user/info" />
                        <Route
                            exact
                            component={AddressPage}
                            path="/user/addresses"
                        />
                        <Route
                            exact
                            component={PasswordPage}
                            path="/user/password"
                        />
                        <Route
                            exact
                            component={OrderPage}
                            path="/user/orders"
                        />
                    </Switch>
                </SC.ContentContainer>
            </SC.RightContainer>
        </SC.Container>
    );
};

export default User;
