/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import "./App.scss";
import { createHeart, killHeart } from "heartbeats";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./scenes/Home";
import Auth from "./scenes/Auth";
import Admin from "./scenes/Admin";
import Banner from "./components/Banner";
import { getCookie, createCookie, removeCookie } from "./services/helper/cookie";
import { ROLE_GUEST, ROLE_USER, ROLE_ADMIN, REFRESH_TOKENS_TIMESPAN } from "./constants";
import { getCart, updateCartDatabase } from "./services/helper/cart";
import Filter from "./components/Filter";

const App = (props) => {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => loadData(), []);

    const fetchToken = async () => {
        const token = getCookie("access_token");
        const response = await fetch("/cxf/api/auth/token", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.ok ? await response.text() : null;
    };

    const syncUserCart = (userCart) => {
        const cart = getCart();
        if (JSON.stringify(cart) === userCart) return;
        Object.keys(cart).length === 0
            ? localStorage.setItem("cart", userCart)
            : updateCartDatabase(cart);
    };

    const createRefreshTokenHeart = () => {
        const heart = createHeart(REFRESH_TOKENS_TIMESPAN, "refresh_token");
        heart.createEvent(1, async () => {
            const token = await fetchToken();
            if (token) {
                createCookie("access_token", token);
            } else {
                removeCookie("access_token");
                killHeart("refresh_token");
                window.location.href = "/";
            }
        });
    };

    const loadData = async () => {
        if (getCookie("access_token") === null) {
            setRole(ROLE_GUEST);
            setLoading(true);
        }

        const token = await fetchToken();
        if (token) {
            createCookie("access_token", token);
            const response = await fetch("/cxf/api/users/me", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const user = await response.json();
                createRefreshTokenHeart();
                syncUserCart(user["cart"]);
                setRole(user["role"]);
            }
        } else {
            removeCookie("access_token");
            killHeart("refresh_token");
            setRole(ROLE_GUEST);
        }
        setLoading(false);
    };

    const buildRoutes = (role) => {
        switch (role) {
            case ROLE_GUEST:
                return guestRoutes();
            case ROLE_USER:
                return userRoutes();
            case ROLE_ADMIN:
                return adminRoutes();
            default:
                return null;
        }
    };

    const guestRoutes = () => (
        <Fragment>
            <Route
                exact
                component={Home}
                path={["/", "/search", "/user", "/cart", "/product/:id", "/product/:alt/:id"]}
            />
            <Route exact component={Auth} path="/auth/(forgot|login|register)" />
        </Fragment>
    );

    const userRoutes = () => (
        <Route
            exact
            component={Home}
            path={[
                "/",
                "/search",
                "/user",
                "/cart",
                "/payment",
                "/product/:id",
                "/product/:alt/:id",
                "/user/(info|password|address|order)",
                "/user/address/(edit|create)",
                "/user/address/:id",
            ]}
        />
    );

    const adminRoutes = () => (
        <Fragment>
            <Route
                exact
                component={Home}
                path={[
                    "/",
                    "/search",
                    "/user",
                    "/cart",
                    "/payment",
                    "/product/:id",
                    "/product/:alt/:id",
                    "/user/(info|password|address|order)",
                    "/user/address/(edit|create)",
                    "/user/order/:orderId",
                ]}
            />
            <Route exact component={Admin} path="/admin/(|products|orders|promotions)" />
        </Fragment>
    );

    return loading ? null : (
        <BrowserRouter>
            <Banner role={role} />
            <Filter />
            <div className="container">
                <Switch>{buildRoutes(role)}</Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
