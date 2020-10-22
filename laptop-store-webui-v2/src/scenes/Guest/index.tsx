import React from "react";
import { Switch, Route } from "react-router";
import HomePage from "./scenes/HomePage";
import DetailPage from "./scenes/DetailPage";
import ComparePage from "./scenes/ComparePage";
import { SC } from "./styles";
import CartPage from "./scenes/CartPage";
import ItemCategory from "./scenes/HomePage/components/ItemCategory";

const Guest = () => (
    <SC.Container>
        <Switch>
            <Route exact path={["/", "/filter"]} component={HomePage} />
            <Route exact path="/products/:productAlt/:productId" component={DetailPage} />
            <Route exact path="/compare/:alt1-vs-:alt2/:id1/:id2" component={ComparePage} />
            <Route exact path="/cart" component={CartPage} />
            <Route
                exact
                path="/search"
                component={() => <ItemCategory title="KẾT QUẢ TÌM KIẾM" category="search" />}
            />
        </Switch>
    </SC.Container>
);

export default Guest;
