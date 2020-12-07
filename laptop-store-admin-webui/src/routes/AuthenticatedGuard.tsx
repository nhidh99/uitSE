import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCookie } from "@/services/helper/cookie";

function AuthenticatedGuard({ component: Component, ...rest }) {
    const isAuthenticated = getCookie("access_token");
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login" }} />
                )
            }
        />
    );
}

export default AuthenticatedGuard;
