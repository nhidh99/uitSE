import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import CartPage from "./scenes/CartPage";
import DetailPage from "./scenes/DetailPage";
import UserPage from "./scenes/UserPage";
import HomePage from "./scenes/HomePage";
import ResultPage from "./scenes/ResultPage";
import PaymentPage from "./scenes/PaymentPage";
import ComparePage from "./scenes/ComparePage";

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route
                        exact
                        path={["/product/:id", "/product/:alt/:id"]}
                        component={DetailPage}
                    />
                    <Route exact component={HomePage} path="/" />
                    <Route exact component={ResultPage} path="/result" />
                    <Route exact component={CartPage} path="/cart" />
                    <Route exact component={PaymentPage} path="/payment" />
                    <Route exact component={ComparePage} path="/product/compare/:alt/:id1/:id2" />
                    <Route
                        exact
                        component={UserPage}
                        path={[
                            "/user/address/:id",
                            "/user/order/:orderId",
                            "/user/(info|password|address|order|payment|wish-list)",
                        ]}
                    />
                </Switch>
            </Fragment>
        );
    }
}

export default Home;
