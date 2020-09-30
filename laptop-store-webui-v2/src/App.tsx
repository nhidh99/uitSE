/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import { SC } from "./styles";
import Routes from "./components/Routes";
import { Switch } from "react-router";
import Footer from "./components/Footer";
import { authApi } from "./services/api/authApi";
import {
    createCookie,
    removeCookie,
} from "./services/helper/cookie";
import userApi from "./services/api/userApi";
import store from "./services/redux/store";
import { setUser } from "./services/redux/slices/userSlice";
import TokenConstants from "./values/constants/TokenConstants";

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const tokenResponse = await authApi.getRefreshToken();
                createCookie("access_token", tokenResponse.data);
                return true;
            } catch (err) {
                return false;
            }
        };

        const loadData = async () => {
            let isAuthenticated = await refreshToken();
            try {
                if (isAuthenticated) {
                    const response = await userApi.getCurrentUserInfo();
                    store.dispatch(setUser(response.data));
                }
            } catch (err) {
                store.dispatch(setUser(null));
                isAuthenticated = false;
            } finally {
                if (isAuthenticated) {
                    const heartbeat = setInterval(async () => {
                        isAuthenticated = await refreshToken();
                        if (!isAuthenticated) {
                            clearInterval(heartbeat);
                            removeCookie("access_token");
                            store.dispatch(setUser(null));
                            window.location.reload();
                        }
                    }, TokenConstants.REFRESH_TOKEN_LIFESPAN);
                } else {
                    removeCookie("access_token");
                }
                setLoading(false);
            }
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
        </>
    );
};

export default App;
