import React, { memo } from "react";
import { BrowserRouter } from "react-router-dom";
import HomeRoutes from "./HomeRoutes";
import LoginRoutes from "./LoginRoutes";

function Routes() {
    return (
        <BrowserRouter>
            <HomeRoutes />
            <LoginRoutes />
        </BrowserRouter>
    );
}

export default memo(Routes);
