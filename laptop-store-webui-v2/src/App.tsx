/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import { SC } from "./styles";
import Routes from "./components/Routes";
import { Switch } from "react-router";
import Footer from "./components/Footer";
import { getCookie, removeCookie } from "./services/helper/cookie";
import userApi from "./services/api/userApi";
import store from "./services/redux/store";
import { setUser } from "./services/redux/slices/userSlice";
import UserModel from "./values/models/UserModel";
import MessageBox from "./components/MessageBox";
import { setWishList } from "./services/redux/slices/wishListSlice";

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            if (getCookie("access_token") !== null) {
                try {
                    const response = await userApi.getCurrentUserInfo();
                    const user: UserModel = response.data;
                    store.dispatch(setUser(user));

                    if (user.cart) {
                        localStorage.setItem("cart", user.cart);
                    } else {
                        const cart = localStorage?.getItem("cart") ?? "{}";
                        await userApi.putCurrentUserCart(cart);
                    }
                    store.dispatch(setWishList(JSON.parse(user?.wish_list ?? "[]")));
                } catch (err) {
                    removeCookie("access_token");
                    localStorage.removeItem("refresh_token");
                }
            }
            setLoading(false);
        };

        loadData();
    }, []);

    return loading ? null : (
        <>
            <Banner />
            <SC.Container>
                <Switch>
                    <Routes />
                </Switch>
            </SC.Container>
            <Footer />
            <MessageBox />
        </>
    );
};

export default App;
