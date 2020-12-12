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
                        <main className="flex flex-auto mt-10 md:mt-0">
                            <SideBar />
                            <div className="flex flex-auto flex-col gap-5 p-5 min-w-0">
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
