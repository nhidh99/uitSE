import React from "react";
import Banner from "./components/Banner";
import { SC } from "./styles";
import Routes from "./components/Routes";
import { Switch } from "react-router";
import { RoleType } from "./global/constants";

const App = () => {
    return (
        <>
            <Banner />
            <SC.Container>
                <Switch>
                    <Routes role={RoleType.GUEST} />
                </Switch>
            </SC.Container>
        </>
    );
};

export default App;
