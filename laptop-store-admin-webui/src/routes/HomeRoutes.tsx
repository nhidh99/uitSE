import Banner from "@/components/Banner";
import SideBar from "@/components/SideBar";
import { PATHS } from "@/constants/paths";
import React, { memo, useMemo } from "react";
import { Switch } from "react-router-dom";
import AuthenticatedGuard from "./AuthenticatedGuard";
import ProductRoutes from "./sub-routes/ProductRoutes";

function HomeRoutes() {
    const authenticatedPaths = useMemo(
        () => Object.values(PATHS).filter((p) => p !== PATHS.LOGIN),
        []
    );

    return (
        <Switch>
            <AuthenticatedGuard
                exact
                path={authenticatedPaths}
                component={() => (
                    <>
                        <Banner />
                        <main className="flex flex-grow">
                            <SideBar />
                            <div className="flex-grow px-5 py-2">
                                <ProductRoutes />
                            </div>
                        </main>
                    </>
                )}
            />
        </Switch>
    );
}

export default memo(HomeRoutes);
