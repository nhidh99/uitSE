import React, { Fragment } from "react";
import RecentCategory from "./components/RecentCategory";
import DiscountCategory from "./components/DiscountCategory";
import CheapCategory from "./components/CheapCategory";
import BestSellingCategory from "./components/BestSellingCategory";

const HomePage = () => {
    return (
        <Fragment>
            <DiscountCategory />
            <BestSellingCategory />
            <RecentCategory />
            <CheapCategory />
        </Fragment>
    );
};

export default HomePage;
