import React, { Fragment } from "react";
import RecentCategory from "./components/RecentCategory";
import DiscountCategory from "./components/DiscountCategory";
import CheapCategory from "./components/CheapCategory";

const HomePage = () => {
    return (
        <Fragment>
            <DiscountCategory />
            <RecentCategory />
            <CheapCategory />
        </Fragment>
    );
};

export default HomePage;
