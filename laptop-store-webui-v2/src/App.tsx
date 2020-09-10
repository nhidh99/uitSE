import React from "react";
import Banner from "./components/Banner";
import { SC } from "./styles";
import Routes from "./components/Routes";
import { Switch } from "react-router";
import { RoleType } from "./global/constants";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            <div>
                <Banner />
                <SC.Container>
                    <Switch>
                        <Routes role={RoleType.GUEST} />
                    </Switch>
                </SC.Container>
            </div>
            <Footer />
        </>
    );
};

export default App;
