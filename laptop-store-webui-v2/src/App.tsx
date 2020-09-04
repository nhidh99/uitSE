import React, { Fragment } from "react";
import Banner from "./components/Banner";
import { SC } from "./styles";
import Routes from "./components/Routes";
import { Switch } from "react-router";
import { RoleType } from "./constants";

const App = () => {
    return (
        <Fragment>
            <Banner />
            <SC.Container>
                <Switch>
                    <Routes role={RoleType.GUEST} />
                </Switch>
            </SC.Container>
        </Fragment>
    );
};

export default App;
