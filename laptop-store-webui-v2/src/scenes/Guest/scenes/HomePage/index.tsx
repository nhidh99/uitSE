import React from "react";
import { Route, Switch } from "react-router";
import ItemCategory from "./components/ItemCategory";
import ItemFilter from "./components/ItemFilter";
import { SC } from "./styles";

const HomePage = () => (
    <SC.Container>
        <SC.LeftContainer>
            <ItemFilter />
        </SC.LeftContainer>

        <SC.RightContainer>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={() => (
                        <>
                            <ItemCategory title="LAPTOP GIẢM GIÁ TỐT" category="discount" />
                            <ItemCategory title="LAPTOP BÁN CHẠY" category="best-selling" />
                            <ItemCategory title="LAPTOP MỚI" category="latest" />
                            <ItemCategory title="LAPTOP GIÁ RẺ" category="cheap" />
                        </>
                    )}
                />

                <Route
                    exact
                    path="/filter"
                    component={() => <ItemCategory title="KẾT QUẢ TÌM KIẾM" category="filter" />}
                />
            </Switch>
        </SC.RightContainer>
    </SC.Container>
);

export default HomePage;
